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

                    const teams = JSON.parse(JSON.stringify(result));
                    // Push leader indexes into freelancer_idxs array
                    teams.forEach(team => freelancer_idxs.push(team.leader_idx));

                    // TODO query Team_member table
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