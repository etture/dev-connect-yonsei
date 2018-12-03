const db = require('../../database/db');
const {verifyAdmin} = require('./verifyAdmin');

exports.freelancer = (req, res) => {
    const {admin_key, freelancer_idx} = req.body;

    verifyAdmin(admin_key, () => {
        db.query("DELETE FROM `freelancer` WHERE idx = ?", freelancer_idx, (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "admin delete freelancer failed; database error"
            });

            res.status(200).json({
                success: true
            });
        });
    });
};

exports.client = (req, res) => {
    const {admin_key, client_idx} = req.body;

    verifyAdmin(admin_key, () => {
        db.query("DELETE FROM `client` WHERE idx = ?", client_idx, (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "admin delete client failed; database error"
            });

            res.status(200).json({
                success: true
            });
        });
    });
};
