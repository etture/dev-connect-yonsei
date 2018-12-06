const db = require('../../database/db');
const {verifyAdmin} = require('./verifyAdmin');

exports.getFreelancers = (req, res) => {
    const {admin_key} = req.body;

    verifyAdmin(admin_key, () => {
        db.query('SELECT * FROM `Freelancer`', (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "admin get freelancers failed; database error"
            });

            const freelancers = JSON.parse(JSON.stringify(result));

            res.status(200).json({
                success: true,
                freelancers
            });
        });
    });
};

exports.getClients = (req, res) => {
    const {admin_key} = req.body;

    verifyAdmin(admin_key, () => {
        db.query('SELECT * FROM `Client`', (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "admin get clients failed; database error"
            });

            const clients = JSON.parse(JSON.stringify(result));

            res.status(200).json({
                success: true,
                clients
            });
        });
    });
};

exports.getAllUsers = (req, res) => {
    const {admin_key} = req.body;

    verifyAdmin(admin_key, () => {
        db.query('SELECT * FROM `Freelancer`', (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "admin get freelancers failed; database error"
            });

            const freelancers = JSON.parse(JSON.stringify(result));

            db.query('SELECT * FROM `Client`', (err, result) => {
                if (err) return res.status(400).json({
                    success: false,
                    error_message: "admin get clients failed; database error"
                });

                const clients = JSON.parse(JSON.stringify(result));

                res.status(200).json({
                    success: true,
                    freelancers,
                    clients
                });
            });
        });
    });
};