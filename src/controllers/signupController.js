const db = require('../database/db');

exports.freelancer = (req, res) => {
    const {email, password, name, age, major, phone, experience} = req.body;
    const entry = {email, password, name, age, major, phone, experience};

    db.query("INSERT INTO `freelancer` SET ?", entry, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer signup failed"
        });

        res.status(200).json({
            success: true,
            freelancer_idx: result.insertId
        });
    });
};

exports.client = (req, res) => {
    const {email, password, name, phone} = req.body;
    const entry = {email, password, name, phone};

    db.query("INSERT INTO `client` SET ?", entry, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "client signup failed"
        });

        res.status(200).json({
            success: true,
            client_idx: result.insertId
        });
    });
};

