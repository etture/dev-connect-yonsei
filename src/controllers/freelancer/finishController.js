const db = require('../../database/db');

exports.submit = (req, res) => {
    const {freelancer_idx, project_idx} = req.body;

    // Check if freelancer owns the project
    db.query('SELECT * FROM `Current_project` WHERE `project_idx` = ? AND `freelancer_idx` = ?', [project_idx, freelancer_idx], (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer project submission check project ownership failed; database error"
        });

        const project = JSON.parse(JSON.stringify(result));
        if(project.length !== 0){
            db.query('Update `Internal_project` SET `status` = ? WHERE `idx` = ?', ['pending', project_idx], (err) => {
                if (err) return res.status(400).json({
                    success: false,
                    error_message: "freelancer update project to pending failed; database error"
                });

                res.status(200).json({
                    success: true
                });
            });
        }else {
            res.status(400).json({
                success: false,
                error_message: "freelancer project submission check project ownership failed; freelancer doesn't own this project"
            });
        }
    });
};

exports.rateClient = (req, res) => {
    const {freelancer_idx, project_idx, rating} = req.body;

    // Check whether project was properly completed
    db.query('SELECT * FROM `Completed_project` WHERE project_idx = ? AND freelancer_idx = ?', [project_idx, freelancer_idx], (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer rate client get internal project failed; database error"
        });

        const project = JSON.parse(JSON.stringify(result));

        // Project is not in the completed_project table
        // Not properly completed
        if (project.length === 0) {
            res.status(400).json({
                success: false,
                error_message: "freelancer rate client get completed project failed; project has not been completed"
            });
        } else {
            db.query('UPDATE TABLE `Internal_project` SET ? WHERE idx = ?', [{client_rating: rating}, project_idx], (err) => {
                if (err) return res.status(400).json({
                    success: false,
                    error_message: "freelancer rate client failed; database error"
                });

                res.status(200).json({
                    success: true
                });
            });
        }
    });
};