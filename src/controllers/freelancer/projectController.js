const db = require('../../database/db');

exports.getAll = (req, res) => {
    db.query('SELECT * FROM `Internal_project` WHERE status = "available" ORDER BY registered_at DESC', (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer get all available internal projects failed; database error"
        });

        const projects = JSON.parse(JSON.stringify(result));

        res.status(200).json({
            success: true,
            projects
        });
    });
};

exports.getForMe = (req, res) => {
    const {freelancer_idx} = req.body;

    // Query to get list of project_idx where freelancer satisfies project requirements (experience & language proficiency)
    db.query('SELECT experience.project_idx FROM (SELECT project.idx AS project_idx FROM freelancer INNER JOIN internal_project AS project ON freelancer.experience >= project.experience WHERE freelancer.idx = ?) AS experience INNER JOIN (SELECT original_cnt.project_idx FROM (SELECT project_idx, COUNT(*) AS cnt FROM internal_project_language_requirement GROUP BY project_idx) AS original_cnt INNER JOIN (SELECT project_req.project_idx, COUNT(*) AS cnt FROM internal_project_language_requirement AS project_req INNER JOIN programming_language_knowledge AS knowledge ON knowledge.language_idx = project_req.language_idx AND knowledge.proficiency >= project_req.proficiency WHERE knowledge.freelancer_idx = ? GROUP BY project_req.project_idx) AS matching_cnt ON original_cnt.project_idx = matching_cnt.project_idx AND original_cnt.cnt = matching_cnt.cnt) AS language ON experience.project_idx = language.project_idx', [freelancer_idx, freelancer_idx], (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer get indices of matching projects failed; database error"
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
            // Query to get project entries from project_idx that freelancer satisfies
            db.query('SELECT * FROM `Internal_project` WHERE idx in (?)', idx_list, (err, result) => {
                if (err) return res.status(400).json({
                    success: false,
                    error_message: "freelancer get projects with indices failed; database error"
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

exports.getInfo = (req, res) => {
    const {project_idx} = req.body;

    db.query('SELECT * FROM `Internal_project` WHERE idx = ?', project_idx, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer get internal project based on idx failed; database error"
        });

        const project = JSON.parse(JSON.stringify(result));

        db.query('SELECT * FROM `Internal_project_language_requirement` WHERE project_idx = ?', project_idx, (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "freelancer get internal project language requirement based on idx failed; database error"
            });

            const language_req = JSON.parse(JSON.stringify(result));

            res.status(200).json({
                success: true,
                project,
                language_req
            });
        });
    });
};

exports.apply = (req, res) => {
    const {freelancer_idx, project_idx} = req.body;

    // Query to get list of project_idx where freelancer satisfies project requirements (experience & language proficiency)
    db.query('SELECT experience.project_idx FROM (SELECT project.idx AS project_idx FROM freelancer INNER JOIN internal_project AS project ON freelancer.experience >= project.experience WHERE freelancer.idx = ?) AS experience INNER JOIN (SELECT original_cnt.project_idx FROM (SELECT project_idx, COUNT(*) AS cnt FROM internal_project_language_requirement GROUP BY project_idx) AS original_cnt INNER JOIN (SELECT project_req.project_idx, COUNT(*) AS cnt FROM internal_project_language_requirement AS project_req INNER JOIN programming_language_knowledge AS knowledge ON knowledge.language_idx = project_req.language_idx AND knowledge.proficiency >= project_req.proficiency WHERE knowledge.freelancer_idx = ? GROUP BY project_req.project_idx) AS matching_cnt ON original_cnt.project_idx = matching_cnt.project_idx AND original_cnt.cnt = matching_cnt.cnt) AS language ON experience.project_idx = language.project_idx', [freelancer_idx, freelancer_idx], (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer get indices of matching projects failed; database error"
        });

        const project_idxs = JSON.parse(JSON.stringify(result));
        let idx_list = [];
        project_idxs.forEach(id_obj => idx_list.push(id_obj.project_idx));

        if (idx_list.length === 0) {
            // Freelancer doesn't have any matching projects
            res.status(400).json({
                success: false,
                error_message: "freelancer doesn't have any matching projects"
            });
        } else if(!idx_list.includes(project_idx)) {
            // Freelancer can't apply to this project
            res.status(400).json({
                success: false,
                error_message: "freelancer can't apply to this project; requirements not met"
            });
        } else {
            // Freelancer can apply to this project
            const application = {
                project_idx,
                freelancer_or_team: 'freelancer',
                freelancer_idx
            };
            db.query('INSERT INTO `Application` SET ?', application, (err, result) => {
                if (err) return res.status(400).json({
                    success: false,
                    error_message: "freelancer project application failed; database error"
                });

                res.status(200).json({
                    success: true
                });
            });
        }
    });
};

exports.getApplied = (req, res) => {
    const {freelancer_idx} = req.body;

    db.query('SELECT internal_project.* FROM `Application` INNER JOIN `Internal_project` ON application.project_idx = internal_project.idx WHERE application.freelancer_idx = ?', freelancer_idx, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer get applied projects failed; database error"
        });

        const applied = JSON.parse(JSON.stringify(result));

        res.status(200).json({
            success: true,
            applied
        });
    });
};

exports.getCurrent = (req, res) => {
    const {freelancer_idx} = req.body;

    db.query('SELECT * FROM `Current_project` WHERE `single_or_team` != "team" AND `freelancer_idx` = ?', freelancer_idx, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer get current projects failed; database error"
        });

        const current = JSON.parse(JSON.stringify(result));

        res.status(200).json({
            success: true,
            current
        });
    });
};