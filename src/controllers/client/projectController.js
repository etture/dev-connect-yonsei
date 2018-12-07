const db = require('../../database/db');

exports.register = (req, res) => {
    const {client_idx, name, start_date, end_date, min_part, max_part, experience, pay, req_doc} = req.body;

    const toRegister = {
        client_idx,
        name,
        start_date,
        end_date,
        min_part,
        max_part,
        experience,
        pay,
        req_doc,
        status: "available"
    };
    Object.keys(toRegister).forEach(key => toRegister[key] === undefined && delete toRegister[key]);

    db.query('INSERT INTO `Internal_project` SET ?', toRegister, (err) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "client register project failed; database error"
        });

        res.status(200).json({
            success: true
        });
    });
};

exports.getCurrent = (req, res) => {
    const {client_idx} = req.body;

    db.query('SELECT * FROM `Internal_project` WHERE client_idx = ? AND status = "working"', client_idx, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "client get currently worked-on project failed; database error"
        });

        const current = JSON.parse(JSON.stringify(result));

        res.status(200).json({
            success: true,
            current
        });
    });
};

exports.getRegistered = (req, res) => {
    const {client_idx} = req.body;

    db.query('SELECT * FROM `Internal_project` WHERE client_idx = ?', client_idx, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "client get all registered projects failed; database error"
        });

        const registered = JSON.parse(JSON.stringify(result));

        res.status(200).json({
            success: true,
            registered
        });
    });
};

exports.getCompleted = (req, res) => {
    const {client_idx} = req.body;

    db.query('SELECT * FROM `Internal_project` WHERE client_idx = ? AND status = "completed"', client_idx, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "client get all completed projects failed; database error"
        });

        const completed = JSON.parse(JSON.stringify(result));

        res.status(200).json({
            success: true,
            completed
        });
    });
};

exports.getApplicants = (req, res) => {
    const {client_idx, project_idx} = req.body;

    // Check whether client owns the project
    db.query('SELECT * FROM `Internal_project` WHERE client_idx = ? AND idx = ?', [client_idx, project_idx], (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "client get applicants check project ownership failed; database error"
        });

        const project = JSON.parse(JSON.stringify(result));

        // Ownership checked
        if(project.length !== 0){
            // Get all applications with the corresponding project idx
            db.query('SELECT * FROM `Application` WHERE project_idx = ?', project_idx, (err, result) => {
                if (err) return res.status(400).json({
                    success: false,
                    error_message: "client get applicants get applications failed; database error"
                });

                // Get applications and separate them into freelancer apps and team apps
                const applications = JSON.parse(JSON.stringify(result));

                if(applications.length === 0){
                    return res.status(400).json({
                        success: false,
                        error_message: "client get applicants failed; no applications for this project"
                    });
                }

                const freelancer_apps = applications.filter(app => app.freelancer_or_team === "freelancer");
                const team_apps = applications.filter(app => app.freelancer_or_team === "team");

                // Make arrays with freelancer indices and team indices for DB querying
                const freelancer_idxs = [];
                const team_idxs = [];
                freelancer_apps.forEach(app => freelancer_idxs.push(app.freelancer_idx));
                team_apps.forEach(app => team_idxs.push(app.team_idx));

                // Get teams with the team indices from applications first
                db.query('SELECT * FROM `Team` WHERE `idx` IN (?)', team_idxs, (err, result) => {
                    if (err) return res.status(400).json({
                        success: false,
                        error_message: "client get applicants get teams failed; database error"
                    });

                    const team_list = JSON.parse(JSON.stringify(result));
                    // Push leader indexes into freelancer_idxs array
                    team_list.forEach(team => freelancer_idxs.push(team.leader_idx));

                    db.query('SELECT * FROM `Team_member` WHERE `team_idx` IN (?)', team_idxs, (err, result) => {
                        if (err) return res.status(400).json({
                            success: false,
                            error_message: "client get applicants get team members failed; database error"
                        });

                        const team_member_list = JSON.parse(JSON.stringify(result));
                        const team_member_idxs = [];
                        // Push team member indexes into freelancer_idxs array
                        team_member_list.forEach(member => team_member_idxs.push(member.freelancer_idx));

                        // Combine the two lists to query only once
                        const all_idxs = freelancer_idxs.concat(team_member_idxs);

                        db.query('SELECT idx, email, name, age, major, phone, experience, rating FROM `Freelancer` WHERE `idx` IN (?)', all_idxs, (err, result) => {
                            if (err) return res.status(400).json({
                                success: false,
                                error_message: "client get applicants get freelancers failed; database error"
                            });

                            // List of freelancers including both single freelancers and those who are part of teams
                            const freelancer_list = JSON.parse(JSON.stringify(result));

                            db.query('SELECT programming_language_knowledge.*, programming_language.name FROM `Programming_language_knowledge` INNER JOIN `Programming_language` ON programming_language_knowledge.language_idx = programming_language.idx WHERE `freelancer_idx` IN (?)', freelancer_idxs, (err, result) => {
                                if (err) return res.status(400).json({
                                    success: false,
                                    error_message: "client get applicants get freelancer language knowledge failed; database error"
                                });

                                const knowledges = JSON.parse(JSON.stringify(result));

                                // Final arrays to be returned to client
                                // Array construction begins here
                                const freelancers = [];
                                const teams = [];

                                const freelancer_only = freelancer_list.filter(freelancer => freelancer_idxs.includes(freelancer.idx));
                                const team_member_only = freelancer_list.filter(freelancer => team_member_idxs.includes(freelancer.idx));

                                // Construct freelancers array
                                freelancer_only.forEach((freelancer) => {
                                    let language_knowledge = [];
                                    const knowledge_list = knowledges.filter(knowledge => knowledge.freelancer_idx === freelancer.idx);
                                    knowledge_list.forEach((knowledge) => {
                                        language_knowledge.push({
                                            language: knowledge.name,
                                            proficiency: knowledge.proficiency
                                        });
                                    });

                                    freelancers.push({
                                        ...freelancer,
                                        language_knowledge
                                    });
                                });

                                // Construct teams array
                                team_list.forEach((team) => {
                                    const leader_freelancer = team_member_only.filter(freelancer => freelancer.idx === team.leader_idx)[0];
                                    let leader_language_knowledge = [];
                                    const leader_knowledge_list = knowledges.filter(knowledge => knowledge.freelancer_idx === leader_freelancer.idx);
                                    leader_knowledge_list.forEach((knowledge) => {
                                        leader_language_knowledge.push({
                                            language: knowledge.name,
                                            proficiency: knowledge.proficiency
                                        });
                                    });

                                    const this_team_members = team_member_list.filter(member => member.team_idx === team.idx);
                                    const team_members = [];
                                    console.log('team_member_only:', team_member_only);
                                    if(this_team_members.length > 0) {
                                        this_team_members.forEach((member) => {
                                            const team_member_candidate = team_member_only.filter(candidate => candidate.idx === member.freelancer_idx);

                                            if(team_member_candidate.length === 0) return;

                                            const team_member = team_member_candidate[0];

                                            if(team_member.idx === team.leader_idx) return;

                                            let language_knowledge = [];
                                            const knowledge_list = knowledges.filter(knowledge => knowledge.freelancer_idx === team_member_candidate.idx);
                                            knowledge_list.forEach((knowledge) => {
                                                language_knowledge.push({
                                                    language: knowledge.name,
                                                    proficiency: knowledge.proficiency
                                                });
                                            });

                                            team_members.push({
                                                ...team_member,
                                                language_knowledge
                                            });
                                        });
                                    }

                                    teams.push({
                                        name: team.name,
                                        comment: team.comment,
                                        leader: {
                                            ...leader_freelancer,
                                            language_knowledge: leader_language_knowledge
                                        },
                                        team_members
                                    });
                                });

                                res.status(200).json({
                                    success: true,
                                    applicants: {
                                        freelancers,
                                        teams
                                    }
                                });
                            });
                        });
                    });
                });
            });
        } else {
            res.status(400).json({
                success: false,
                error_message: "client get applicants check project ownership failed; client doesn't own this project"
            });
        }
    });
};

exports.acceptApplicant = (req, res) => {

};