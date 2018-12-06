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


};

exports.acceptApplicant = (req, res) => {

};