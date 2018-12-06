const db = require('../../database/db');

exports.create = (req, res) => {
    const {freelancer_idx} = req.body;
    const {name, comment} = req.body;
    let team_info = {name, comment, leader_idx: freelancer_idx};
    Object.keys(team_info).forEach(key => team_info[key] === undefined && delete team_info[key]);

    // When creating a team, create the team and then join the team
    // through a transaction of 2 queries
    db.beginTransaction((err) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer create team failed; database transaction error"
        });

        db.query('INSERT INTO `Team` SET ?', team_info, (err, result) => {
            if (err) {
                return db.rollback(() => {
                    res.status(400).json({
                        success: false,
                        error_message: "freelancer create team failed; database error"
                    });
                });
            }

            const team_idx = result.insertId;
            const join_team = {freelancer_idx, team_idx};

            db.query('INSERT INTO `Team_member` SET ?', join_team, (err) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(400).json({
                            success: false,
                            error_message: "freelancer join team failed; database error"
                        });
                    });
                }

                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(400).json({
                                success: false,
                                error_message: "freelancer join team failed; database transaction commit error"
                            });
                        });
                    }
                    res.status(200).json({
                        success: true
                    });
                });
            });
        });
    });
};

exports.join = (req, res) => {
    const {freelancer_idx, team_idx} = req.body;
    const join_team = {freelancer_idx, team_idx};

    db.query('INSERT INTO `Team_member` SET ?', join_team, (err) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer join team failed; database error"
        });

        res.status(200).json({
            success: true
        });
    });
};

exports.leave = (req, res) => {
    const {freelancer_idx, team_idx} = req.body;

    db.query('SELECT * FROM `Team` WHERE `idx` = ? AND `leader_idx` = ?', [team_idx, freelancer_idx], (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer leave team failed; database error"
        });

        const is_leader = JSON.parse(JSON.stringify(result));
        if (is_leader.length !== 0) {
            res.status(400).json({
                success: false,
                error_message: "freelancer leave team failed; is leader"
            });
        } else {
            db.query('DELETE FROM `Team_member` WHERE `team_idx` = ? AND `freelancer_idx` = ?', [team_idx, freelancer_idx], (err) => {
                if (err) return res.status(400).json({
                    success: false,
                    error_message: "freelancer leave team failed; database error"
                });

                res.status(200).json({
                    success: true
                });
            });
        }
    });
};

exports.getForTeam = (req, res) => {
    const {team_idx} = req.body;

    // Query to get list of project_idx where team satisfies project requirements (experience & language proficiency)
    db.query('SELECT experience.project_idx FROM (SELECT project.idx AS project_idx FROM (SELECT MAX(freelancer.experience) AS experience, COUNT(freelancer.idx) AS cnt FROM freelancer INNER JOIN (SELECT * FROM team_member WHERE team_idx = ?) AS team_member ON freelancer.idx = team_member.freelancer_idx) AS team INNER JOIN (SELECT internal_project.* FROM internal_project INNER JOIN (SELECT COUNT(*) AS cnt FROM team_member WHERE team_idx = ?) AS team_cnt WHERE min_part > 1 AND max_part >= team_cnt.cnt AND status = "available") AS project ON team.experience >= project.experience) AS experience INNER JOIN (SELECT original_cnt.project_idx FROM (SELECT project_idx, COUNT(*) AS cnt FROM internal_project_language_requirement GROUP BY project_idx) AS original_cnt INNER JOIN (SELECT project_req.project_idx, COUNT(*) AS cnt FROM internal_project_language_requirement AS project_req INNER JOIN (SELECT max.* FROM (SELECT knowledge.language_idx, knowledge.proficiency FROM Programming_language_knowledge AS knowledge INNER JOIN (SELECT * FROM team_member WHERE team_idx = ?) AS team_member ON knowledge.freelancer_idx = team_member.freelancer_idx) AS max LEFT JOIN (SELECT knowledge.language_idx, knowledge.proficiency FROM Programming_language_knowledge AS knowledge INNER JOIN (SELECT * FROM team_member WHERE team_idx = ?) AS team_member ON knowledge.freelancer_idx = team_member.freelancer_idx) AS bigger ON max.language_idx = bigger.language_idx AND max.proficiency < bigger.proficiency WHERE bigger.proficiency IS NULL) AS knowledge ON knowledge.language_idx = project_req.language_idx AND knowledge.proficiency >= project_req.proficiency GROUP BY project_req.project_idx) AS matching_cnt ON original_cnt.project_idx = matching_cnt.project_idx AND original_cnt.cnt = matching_cnt.cnt) AS language ON experience.project_idx = language.project_idx', [team_idx, team_idx, team_idx, team_idx], (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer get projects for team failed; database error"
        });

        const project_idxs = JSON.parse(JSON.stringify(result));
        let idx_list = [];
        project_idxs.forEach(id_obj => idx_list.push(id_obj.project_idx));

        if (idx_list.length === 0) {
            res.status(200).json({
                success: true,
                projects: []
            });
        } else {
            // Query to get project entries from project_idx that team satisfies
            db.query('SELECT * FROM `Internal_project` WHERE idx in (?)', idx_list, (err, result) => {
                if (err) return res.status(400).json({
                    success: false,
                    error_message: "freelancer team get projects with indices failed; database error"
                });

                const projects = JSON.parse(JSON.stringify(result));

                res.status(200).json({
                    success: true,
                    projects
                });
            });
        }
    });
};

exports.apply = (req, res) => {
    const {freelancer_idx, team_idx, project_idx} = req.body;

    db.query('SELECT * FROM `Team` WHERE idx = ?', team_idx, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer team get team info failed; database error"
        });

        const team = JSON.parse(JSON.stringify(result))[0];

        // Check to see if freelancer is team leader
        if (team.leader_idx === freelancer_idx) {
            // Query to get list of project_idx where team satisfies project requirements (experience & language proficiency)
            db.query('SELECT experience.project_idx FROM (SELECT project.idx AS project_idx FROM (SELECT MAX(freelancer.experience) AS experience, COUNT(freelancer.idx) AS cnt FROM freelancer INNER JOIN (SELECT * FROM team_member WHERE team_idx = ?) AS team_member ON freelancer.idx = team_member.freelancer_idx) AS team INNER JOIN (SELECT internal_project.* FROM internal_project INNER JOIN (SELECT COUNT(*) AS cnt FROM team_member WHERE team_idx = ?) AS team_cnt WHERE min_part > 1 AND max_part >= team_cnt.cnt AND status = "available") AS project ON team.experience >= project.experience) AS experience INNER JOIN (SELECT original_cnt.project_idx FROM (SELECT project_idx, COUNT(*) AS cnt FROM internal_project_language_requirement GROUP BY project_idx) AS original_cnt INNER JOIN (SELECT project_req.project_idx, COUNT(*) AS cnt FROM internal_project_language_requirement AS project_req INNER JOIN (SELECT max.* FROM (SELECT knowledge.language_idx, knowledge.proficiency FROM Programming_language_knowledge AS knowledge INNER JOIN (SELECT * FROM team_member WHERE team_idx = ?) AS team_member ON knowledge.freelancer_idx = team_member.freelancer_idx) AS max LEFT JOIN (SELECT knowledge.language_idx, knowledge.proficiency FROM Programming_language_knowledge AS knowledge INNER JOIN (SELECT * FROM team_member WHERE team_idx = ?) AS team_member ON knowledge.freelancer_idx = team_member.freelancer_idx) AS bigger ON max.language_idx = bigger.language_idx AND max.proficiency < bigger.proficiency WHERE bigger.proficiency IS NULL) AS knowledge ON knowledge.language_idx = project_req.language_idx AND knowledge.proficiency >= project_req.proficiency GROUP BY project_req.project_idx) AS matching_cnt ON original_cnt.project_idx = matching_cnt.project_idx AND original_cnt.cnt = matching_cnt.cnt) AS language ON experience.project_idx = language.project_idx', [team_idx, team_idx, team_idx, team_idx], (err, result) => {
                if (err) return res.status(400).json({
                    success: false,
                    error_message: "freelancer team get projects for team failed; database error"
                });

                const project_idxs = JSON.parse(JSON.stringify(result));
                let idx_list = [];
                project_idxs.forEach(id_obj => idx_list.push(id_obj.project_idx));

                if (idx_list.length === 0) {
                    // Freelancer doesn't have any matching projects
                    res.status(400).json({
                        success: false,
                        error_message: "freelancer team doesn't have any matching projects"
                    });
                } else if (!idx_list.includes(project_idx)) {
                    // Freelancer can't apply to this project
                    res.status(400).json({
                        success: false,
                        error_message: "freelancer team can't apply to this project; requirements not met"
                    });
                } else {
                    // Freelancer can apply to this project
                    const application = {
                        project_idx,
                        freelancer_or_team: 'team',
                        team_idx
                    };
                    db.query('INSERT INTO `Application` SET ?', application, (err, result) => {
                        if (err) return res.status(400).json({
                            success: false,
                            error_message: "freelancer team project application failed; database error"
                        });

                        res.status(200).json({
                            success: true
                        });
                    });
                }
            });
        } else {
            res.status(400).json({
                success: false,
                error_message: "freelancer is not team leader; no authority to apply for project as team"
            });
        }
    });
};

exports.submit = (req, res) => {
    const {freelancer_idx, team_idx, project_idx} = req.body;

    // Check to see if freelancer is team leader
    db.query('SELECT * FROM `Team` WHERE idx = ?', team_idx, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer team project submission failed; database error"
        });

        const team = JSON.parse(JSON.stringify(result))[0];

        if (team.leader_idx === freelancer_idx) {

            // Check if team owns the project
            db.query('SELECT * FROM `Current_project` WHERE `project_idx` = ? AND `team_idx` = ?', [project_idx, team_idx], (err, result) => {
                if (err) return res.status(400).json({
                    success: false,
                    error_message: "freelancer team project submission check project ownership failed; database error"
                });

                const project = JSON.parse(JSON.stringify(result));

                if(project.length !== 0){
                    db.query('Update `Internal_project` SET `status` = ? WHERE `idx` = ?', ['pending', project_idx], (err) => {
                        if (err) return res.status(400).json({
                            success: false,
                            error_message: "freelancer team update project to pending failed; database error"
                        });

                        res.status(200).json({
                            success: true
                        });
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        error_message: "freelancer team project submission check project ownership failed; team doesn't own this project"
                    });
                }
            });
        } else {
            res.status(400).json({
                success: false,
                error_message: "freelancer is not team leader; no authority to apply for project as team"
            });
        }
    });
};

// Rate client when the project is submitted and accepted as completed
exports.rateClient = (req, res) => {
    const {freelancer_idx, team_idx, project_idx, rating} = req.body;

    // Check whether freelancer is team leader
    db.query('SELECT * FROM `Team` WHERE idx = ?', team_idx, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer team rate client get team info failed; database error"
        });

        const team = JSON.parse(JSON.stringify(result))[0];

        if (team.leader_idx === freelancer_idx) {
            // Check whether project was properly completed
            db.query('SELECT * FROM `Completed_project` WHERE project_idx = ? AND team_idx = ?', [project_idx, team_idx], (err, result) => {
                if (err) return res.status(400).json({
                    success: false,
                    error_message: "freelancer team rate client get internal project failed; database error"
                });

                const project = JSON.parse(JSON.stringify(result));

                // Project is not in the completed_project table
                // Not properly completed
                if (project.length === 0) {
                    res.status(400).json({
                        success: false,
                        error_message: "freelancer team rate client get completed project failed; project has not been completed"
                    });
                } else {
                    db.query('UPDATE TABLE `Internal_project` SET ? WHERE idx = ?', [{client_rating: rating}, project_idx], (err) => {
                        if (err) return res.status(400).json({
                            success: false,
                            error_message: "freelancer team rate client failed; database error"
                        });

                        res.status(200).json({
                            success: true
                        });
                    });
                }
            });
        } else {
            res.status(400).json({
                success: false,
                error_message: "freelancer is not team leader; no authority to rate client on behalf of team"
            });
        }
    });
};