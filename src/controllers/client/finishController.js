const db = require('../../database/db');

exports.getSubmissions = (req, res) => {
    const {client_idx} = req.body;

    db.query('SELECT * FROM `Internal_project` WHERE client_idx = ? AND status = "pending"', client_idx, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "client get submissions failed; database error"
        });

        const pending = JSON.parse(JSON.stringify(result));

        res.status(200).json({
            success: true,
            pending
        });
    });
};

exports.accept = (req, res) => {
    const {client_idx, project_idx} = req.body;

    db.beginTransaction((err) => {
        if (err) {
            return db.rollback(() => {
                res.status(400).json({
                    success: false,
                    error_message: "client accept submission failed; database transaction error"
                });
            });
        }

        db.query('UPDATE `Internal_project` set status = "completed" WHERE idx = ? AND client_idx = ?', [project_idx, client_idx], (err) => {
            if (err) {
                return db.rollback(() => {
                    res.status(400).json({
                        success: false,
                        error_message: "client accept submission failed; database error"
                    });
                });
            }

            db.query('SELECT * FROM `Current_project` WHERE project_idx = ?', project_idx, (err) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(400).json({
                            success: false,
                            error_message: "client accept submission get from current projects failed; database error"
                        });
                    });
                }

                const project = JSON.parse(JSON.stringify(result));

                if (project.length === 0) {
                    res.status(400).json({
                        success: false,
                        error_message: "no current project matched with the project idx"
                    });
                } else {
                    const to_complete = project[0];
                    const freelancer_or_team = to_complete.freelancer_or_team;

                    db.query('DELETE FROM `Current_project` WHERE project_idx = ?', project_idx, (err) => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(400).json({
                                    success: false,
                                    error_message: "client accept submission delete from current projects failed; database error"
                                });
                            });
                        }

                        let query = '';
                        let to_insert = {};
                        if (freelancer_or_team === "freelancer") {
                            query = 'INSERT INTO `Completed_project` (project_idx, freelancer_or_team, freelancer_idx) SET ?';
                            to_insert = {
                                project_idx: to_complete.project_idx,
                                freelancer_or_team,
                                freelancer_idx: to_complete.freelancer_idx
                            };
                        } else if (freelancer_or_team === "team") {
                            query = 'INSERT INTO `Completed_project` (project_idx, freelancer_or_team, team_idx) SET ?';
                            to_insert = {
                                project_idx: to_complete.project_idx,
                                freelancer_or_team,
                                team_idx: to_complete.team_idx
                            };
                        } else {
                            return res.status(400).json({
                                success: false,
                                error_message: "freelancer_or_team not currently input"
                            });
                        }

                        db.query(query, to_insert, (err) => {
                            if (err) {
                                return db.rollback(() => {
                                    res.status(400).json({
                                        success: false,
                                        error_message: "client accept submission insert into completed projects failed; database error"
                                    });
                                });
                            }

                            db.commit((err) => {
                                if (err) {
                                    return db.rollback(() => {
                                        res.status(400).json({
                                            success: false,
                                            error_message: "client accept submission commit transaction failed; database error"
                                        });
                                    });
                                }

                                res.status(200).json({
                                    success: true
                                });
                            });
                        });
                    });
                }
            });
        });
    });
};

exports.reject = (req, res) => {
    const {client_idx, project_idx} = req.body;

    db.query('UPDATE `Internal_project` set status = "working" WHERE idx = ? AND client_idx = ?', [project_idx, client_idx], (err) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "client reject submission failed; database error"
        });

        res.status(200).json({
            success: true
        });
    });
};

exports.rate = (req, res) => {
    const {client_idx, project_idx, rating} = req.body;

    db.beginTransaction((err) => {
        if (err) {
            return db.rollback(() => {
                res.status(400).json({
                    success: false,
                    error_message: "client rate freelancer get internal project failed; database transaction error"
                });
            });
        }

        // Check whether project was properly completed
        db.query('SELECT * FROM `Completed_project` WHERE project_idx = ?', project_idx, (err, result) => {
            if (err) {
                return db.rollback(() => {
                    res.status(400).json({
                        success: false,
                        error_message: "client rate freelancer get internal project failed; database error"
                    });
                });
            }

            const project = JSON.parse(JSON.stringify(result));

            // Project is not in the completed_project table
            // Not properly completed
            if (project.length === 0) {
                res.status(400).json({
                    success: false,
                    error_message: "client rate freelancer get completed project failed; project has not been completed"
                });
            } else {
                const freelancer_or_team = project.freelancer_or_team;

                if (freelancer_or_team === "freelancer") {
                    db.query('UPDATE TABLE `Internal_project` SET ? WHERE idx = ?', [{freelancer_rating: rating}, project_idx], (err) => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(400).json({
                                    success: false,
                                    error_message: "client rate freelancer failed; database error"
                                });
                            });
                        }

                        db.query('SELECT idx, rating, rating_cnt FROM `Freelancer` WHERE idx = ?', project.freelancer_idx, (err, result) => {
                            if (err) {
                                return db.rollback(() => {
                                    res.status(400).json({
                                        success: false,
                                        error_message: "client rate freelancer get project failed; database error"
                                    });
                                });
                            }

                            const freelancer = JSON.parse(JSON.stringify(result))[0];

                            if (freelancer === undefined) {
                                return db.rollback(() => {
                                    res.status(400).json({
                                        success: false,
                                        error_message: "client rate freelancer get client failed; client undefined"
                                    });
                                });
                            } else {
                                const original_rating = freelancer.rating;
                                const original_cnt = freelancer.rating_cnt;

                                const new_cnt = original_cnt + 1;
                                const new_rating = ((original_rating * original_cnt) + rating) / new_cnt;

                                db.query('UPDATE TABLE `Freelancer` SET ? WHERE idx = ?', [{
                                    rating: new_rating,
                                    rating_cnt: new_cnt
                                }, freelancer.idx], (err) => {
                                    if (err) {
                                        return db.rollback(() => {
                                            res.status(400).json({
                                                success: false,
                                                error_message: "client rate freelancer input new rating failed; database error"
                                            });
                                        });
                                    }

                                    db.commit((err) => {
                                        if (err) {
                                            return db.rollback(() => {
                                                res.status(400).json({
                                                    success: false,
                                                    error_message: "client rate freelancer commit transaction failed; database error"
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
                } else if (freelancer_or_team === "team") {
                    db.query('UPDATE TABLE `Internal_project` SET ? WHERE idx = ?', [{freelancer_rating: rating}, project_idx], (err) => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(400).json({
                                    success: false,
                                    error_message: "client rate freelancer failed; database error"
                                });
                            });
                        }

                        db.query('SELECT f.idx, f.rating, f.rating_cnt FROM team INNER JOIN team_member ON team.idx = team_member.team_idx INNER JOIN freelancer f on team_member.freelancer_idx = f.idx WHERE team.idx = ?', project.team_idx, (err, result) => {
                            if (err) {
                                return db.rollback(() => {
                                    res.status(400).json({
                                        success: false,
                                        error_message: "client rate freelancer get team members failed; database error"
                                    });
                                });
                            }

                            const members = JSON.parse(JSON.stringify(result));

                            if (members.length === 0) {
                                return db.rollback(() => {
                                    res.status(400).json({
                                        success: false,
                                        error_message: "client rate freelancer get team members failed; client undefined"
                                    });
                                });
                            } else {
                                const ratings = [];

                                members.forEach((member) => {
                                    const original_rating = member.rating;
                                    const original_cnt = member.rating_cnt;

                                    const new_cnt = original_cnt + 1;
                                    const new_rating = ((original_rating * original_cnt) + rating) / new_cnt;

                                    ratings.push([new_rating, new_cnt]);
                                });

                                db.query('INSERT INTO `Freelancer` (idx, rating, rating_cnt) VALUES ? ON DUPLICATE KEY UPDATE rating = VALUES(rating), rating_cnt = VALUES(rating_cnt)', [ratings], (err) => {
                                    if (err) {
                                        return db.rollback(() => {
                                            res.status(400).json({
                                                success: false,
                                                error_message: "client rate freelancer update team members ratings failed; database error"
                                            });
                                        });
                                    }

                                    db.commit((err) => {
                                        if (err) {
                                            return db.rollback(() => {
                                                res.status(400).json({
                                                    success: false,
                                                    error_message: "client rate freelancer commit transaction failed; database error"
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
                } else {
                    return db.rollback(() => {
                        res.status(400).json({
                            success: false,
                            error_message: "client rate freelancer failed; freelancer_or_team not properly input"
                        });
                    });
                }
            }
        });
    });
};