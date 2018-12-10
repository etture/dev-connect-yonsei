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
            db.query('UPDATE `Internal_project` SET `status` = ? WHERE `idx` = ?', ['pending', project_idx], (err) => {
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

    db.beginTransaction((err) => {
        if(err){
            return db.rollback(() => {
                res.status(400).json({
                    success: false,
                    error_message: "freelancer rate client get internal project failed; database transaction error"
                });
            });
        }

        // Check whether project was properly completed
        db.query('SELECT * FROM `Completed_project` WHERE project_idx = ? AND freelancer_idx = ?', [project_idx, freelancer_idx], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    res.status(400).json({
                        success: false,
                        error_message: "freelancer rate client get internal project failed; database error"
                    });
                });
            }

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
                    if (err) {
                        return db.rollback(() => {
                            res.status(400).json({
                                success: false,
                                error_message: "freelancer rate client failed; database error"
                            });
                        });
                    }

                    db.query('SELECT client.idx, client.rating, client.rating_cnt FROM `Internal_project` INNER JOIN `Client` ON internal_project.client_idx = client.idx WHERE internal_project.idx = ?', project_idx, (err, result) => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(400).json({
                                    success: false,
                                    error_message: "freelancer rate client get project failed; database error"
                                });
                            });
                        }

                        const client = JSON.parse(JSON.stringify(result))[0];

                        if(client === undefined) {
                            return db.rollback(() => {
                                res.status(400).json({
                                    success: false,
                                    error_message: "freelancer rate client get client failed; client undefined"
                                });
                            });
                        } else {
                            const original_rating = client.rating;
                            const original_cnt = client.rating_cnt;

                            const new_cnt = original_cnt + 1;
                            const new_rating = ((original_rating * original_cnt) + rating) / new_cnt;

                            db.query('UPDATE TABLE `Client` SET ? WHERE idx = ?', [{rating: new_rating, rating_cnt: new_cnt}, client.idx], (err) => {
                                if (err) {
                                    return db.rollback(() => {
                                        res.status(400).json({
                                            success: false,
                                            error_message: "freelancer rate client input new rating failed; database error"
                                        });
                                    });
                                }

                                db.commit((err) => {
                                    if (err) {
                                        return db.rollback(() => {
                                            res.status(400).json({
                                                success: false,
                                                error_message: "freelancer rate client commit transaction failed; database error"
                                            });
                                        });
                                    }

                                    res.status(200).json({
                                        success: true
                                    });
                                });
                            });
                        }
                    });
                });
            }
        });
    });
};