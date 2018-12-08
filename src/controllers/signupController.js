const db = require('../database/db');

exports.freelancer = (req, res) => {
    const {email, password, name, age, major, phone, experience, languages} = req.body;
    const entry = {email, password, name, age, major, phone, experience};

    db.beginTransaction((err) => {
        if (err) {
            return db.rollback(() => {
                res.status(400).json({
                    success: false,
                    error_message: "freelancer signup failed; database transaction error"
                });
            });
        }

        db.query("INSERT INTO `freelancer` SET ?", entry, (err, result) => {
            if (err) {
                return db.rollback(() => {
                    res.status(400).json({
                        success: false,
                        error_message: "freelancer signup insert into freelancer table failed; database error"
                    });
                });
            }

            const freelancer_idx = result.insertId;

            if (languages === undefined || languages.length === 0) {
                res.status(200).json({
                    success: true,
                    freelancer_idx
                });
            } else {
                const languages_insert = [];
                languages.forEach((language) => languages_insert.push([freelancer_idx, language.language_idx, language.proficiency]));

                db.query('INSERT INTO `Programming_language_knowledge` (freelancer_idx, language_idx, proficiency) VALUES ?', [languages_insert], (err) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(400).json({
                                success: false,
                                error_message: "freelancer signup insert programming languages failed; database error"
                            });
                        });
                    }

                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(400).json({
                                    success: false,
                                    error_message: "freelancer signup commit transaction failed; database error"
                                });
                            });
                        }

                        res.status(200).json({
                            success: true,
                            freelancer_idx
                        });
                    });
                });
            }
        });
    });
};

exports.client = (req, res) => {
    const {email, password, name, phone} = req.body;
    const entry = {email, password, name, phone};

    db.query("INSERT INTO `client` SET ?", entry, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "client signup failed"
        });

        res.status(200).json({
            success: true,
            client_idx: result.insertId
        });
    });
};

