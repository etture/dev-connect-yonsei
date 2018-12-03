const db = require('../../database/db');
const {verifyAdmin} = require('./verifyAdmin');

exports.modify = (req, res) => {
    const {admin_key, team_idx} = req.body;
    const {name, comment, leader_idx} = req.body;
    let modified = {name, comment, leader_idx};
    Object.keys(modified).forEach(key => modified[key] === undefined && delete modified[key]);

    verifyAdmin(admin_key, () => {
        // Check whether team is currently working on any project
        db.query("SELECT * FROM `Current_project` WHERE team_idx = ?", team_idx, (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "admin modify team failed; database error"
            });

            const current_projects = JSON.parse(JSON.stringify(result));
            if(current_projects.length !== 0) {
                res.status(400).json({
                    success: false,
                    error_message: "admin modify team failed; team currently working on project"
                });
            } else {
                db.query("UPDATE `Team` SET ? WHERE idx = ?", [modified, team_idx], (err, result) => {
                    if (err) return res.status(400).json({
                        success: false,
                        error_message: "admin modify team failed; database error"
                    });

                    res.status(200).json({
                        success: true
                    });
                });
            }
        });
    });
};

exports.delete = (req, res) => {
    const {admin_key, team_idx} = req.body;

    verifyAdmin(admin_key, () => {
        // Check whether team is currently working on any project
        db.query("SELECT * FROM `Current_project` WHERE team_idx = ?", team_idx, (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "admin modify team failed; database error"
            });

            const current_projects = JSON.parse(JSON.stringify(result));
            if(current_projects.length !== 0) {
                res.status(400).json({
                    success: false,
                    error_message: "admin modify team failed; team currently working on project"
                });
            } else {
                db.query("DELETE FROM `Team` WHERE idx = ?", team_idx, (err, result) => {
                    if (err) return res.status(400).json({
                        success: false,
                        error_message: "admin modify team failed; database error"
                    });

                    res.status(200).json({
                        success: true
                    });
                });
            }
        });
    });
};