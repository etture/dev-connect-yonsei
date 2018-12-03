const db = require('../../database/db');

exports.verifyAdmin = (admin_key, next) => {
    db.query("SELECT * FROM `admin` WHERE admin_key = ?", admin_key, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "admin verification failed"
        });
        next();
    });
};