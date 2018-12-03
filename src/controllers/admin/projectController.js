const db = require('../../database/db');
const {verifyAdmin} = require('./verifyAdmin');

exports.getAll = (req, res) => {
    db.query("SELECT * FROM `Internal_project`", (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "admin get all internal projects failed"
        });

        const projects = JSON.parse(JSON.stringify(result));

        res.status(200).json({
            success: true,
            projects
        });
    });
};

exports.modify = (req, res) => {
    const {admin_key, project_idx} = req.body;
    const {start_date, end_date, min_part, max_part, experience, pay, req_doc} = req.body;
    let modified = {start_date, end_date, min_part, max_part, experience, pay, req_doc};
    Object.keys(modified).forEach(key => modified[key] === undefined && delete modified[key]);

    verifyAdmin(admin_key, () => {
        db.query("UPDATE `Internal_project` SET ? WHERE idx = ?", [modified, project_idx], (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "admin modify project failed"
            });

            res.status(200).json({
                success: true
            });
        });
    });
};

exports.delete = (req, res) => {
    const {admin_key, project_idx} = req.body;

    verifyAdmin(admin_key, () => {
        db.query("DELETE FROM `Internal_project` WHERE idx = ?", project_idx, (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "admin delete project failed"
            });

            res.status(200).json({
                success: true
            });
        });
    });
};