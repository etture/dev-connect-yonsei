const db = require('../database/db');

exports.admin = (req, res) => {
    const {email, password} = req.body;

    db.query("SELECT * FROM `admin` WHERE `email` = ? AND `password` = ?", [email, password], (err, result) => {
        if(err) return res.status(400).json({
            success: false,
            error_message: "admin signin failed"
        });

        const admin = JSON.parse(JSON.stringify(result))[0];
        if(admin === undefined) {
            res.status(400).json({
                success: false,
                error_message: "admin signin failed"
            });
        } else {
            res.status(200).json({
                success: true,
                admin_idx: admin.idx
            });
        }
    })
};

exports.freelancer = (req, res) => {
    const {email, password} = req.body;

    db.query("SELECT * FROM `freelancer` WHERE `email` = ? AND `password` = ?", [email, password], (err, result) => {
        if(err) return res.status(400).json({
            success: false,
            error_message: "freelancer signin failed"
        });

        const freelancer = JSON.parse(JSON.stringify(result))[0];
        if(freelancer === undefined){
            res.status(400).json({
                success: false,
                error_message: "freelancer signin failed"
            });
        } else {
            res.status(200).json({
                success: true,
                freelancer_idx: freelancer.idx
            });
        }
    });
};

exports.client = (req, res) => {
    const {email, password} = req.body;

    db.query("SELECT * FROM `client` WHERE `email` = ? AND `password` = ?", [email, password], (err, result) => {
        if(err) return res.status(400).json({
            success: false,
            error_message: "client signin failed"
        });

        const client = JSON.parse(JSON.stringify(result))[0];
        if(client === undefined){
            res.status(400).json({
                success: false,
                error_message: "client signin failed"
            });
        } else {
            res.status(200).json({
                success: true,
                client_idx: client.idx
            });
        }
    });
};