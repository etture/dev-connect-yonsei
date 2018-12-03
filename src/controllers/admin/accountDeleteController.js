const db = require('../../database/db');

exports.freelancer = (req, res) => {
    const {freelancer_idx} = req.body;

    db.query("DELETE FROM `freelancer` WHERE idx = ?", freelancer_idx, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "admin delete freelancer failed"
        });

        res.status(200).json({
            success: true
        });
    });
};

exports.client = (req, res) => {
    const {client_idx} = req.body;

    db.query("DELETE FROM `client` WHERE idx = ?", client_idx, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "admin delete client failed"
        });

        res.status(200).json({
            success: true
        });
    });
};

