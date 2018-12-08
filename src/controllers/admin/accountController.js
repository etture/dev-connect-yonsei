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

exports.getFreelancerByIdx = (req, res) => {
    const {admin_key, freelancer_idx} = req.body;

    verifyAdmin(admin_key, () => {
        db.query('SELECT idx, email, name, age, major, phone, experience, rating FROM `Freelancer` WHERE idx = ?', freelancer_idx, (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "admin get freelancer by idx failed; database error"
            });

            const freelancer = JSON.parse(JSON.stringify(result))[0];

            if(freelancer === undefined) {
                res.status(400).json({
                    success: false,
                    error_message: "admin get freelancer by idx failed; wrong idx"
                });
            } else {
                res.status(200).json({
                    success: true,
                    freelancer
                });
            }
        });
    });
};

exports.getClientByIdx = (req, res) => {
    const {admin_key, client_idx} = req.body;

    verifyAdmin(admin_key, () => {
        db.query('SELECT idx, email, name, phone, rating FROM `Client` WHERE idx = ?', client_idx, (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "admin get client by idx failed; database error"
            });

            const client = JSON.parse(JSON.stringify(result))[0];

            if(client === undefined) {
                res.status(400).json({
                    success: false,
                    error_message: "admin get client by idx failed; wrong idx"
                });
            } else {
                res.status(200).json({
                    success: true,
                    client
                });
            }
        });
    });
};