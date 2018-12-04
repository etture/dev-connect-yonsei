const db = require('../../database/db');

exports.modify = (req, res) => {
    const {freelancer_idx} = req.body;
    const {password, name, age, major, phone, experience} = req.body;
    let modified = {password, name, age, major, phone, experience};
    Object.keys(modified).forEach(key => modified[key] === undefined && delete modified[key]);

    db.query("UPDATE `Freelancer` SET ? WHERE idx = ?", [modified, freelancer_idx], (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer modify failed; database error"
        });

        res.status(200).json({
            success: true
        });
    });
};