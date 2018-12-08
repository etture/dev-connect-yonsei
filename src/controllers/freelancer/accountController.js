const db = require('../../database/db');

exports.getInfo = (req, res) => {
    const {freelancer_idx} = req.body;

    db.query('SELECT idx, email, name, age, major, phone, experience, rating FROM freelancer WHERE idx = ?', freelancer_idx, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer get info failed; database error"
        });

        const info = JSON.parse(JSON.stringify(result));

        res.status(200).json({
            success: true,
            info
        });
    });
};

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

exports.modifyLanguages = (req, res) => {
    const {freelancer_idx, languages} = req.body;

    db.beginTransaction((err) => {
        if(err) {
            return db.rollback(() => {
                res.status(400).json({
                    success: false,
                    error_message: "freelancer modify languages failed; database transaction error"
                });
            });
        }

        db.query('DELETE FROM `Programming_language_knowledge` WHERE freelancer_idx = ?', freelancer_idx, (err) => {
            if(err) {
                return db.rollback(() => {
                    res.status(400).json({
                        success: false,
                        error_message: "freelancer modify languages delete failed; database error"
                    });
                });
            }

            if (languages === undefined || languages.length === 0) {
                res.status(200).json({
                    success: true
                });
            } else {
                const languages_insert = [];
                languages.forEach((language) => languages_insert.push([freelancer_idx, language.language_idx, language.proficiency]));

                db.query('INSERT INTO `Programming_language_knowledge` (freelancer_idx, language_idx, proficiency) VALUES ?', [languages_insert], (err) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(400).json({
                                success: false,
                                error_message: "freelancer modify languages insert failed; database error"
                            });
                        });
                    }

                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(400).json({
                                    success: false,
                                    error_message: "freelancer modify languages commit transaction failed; database error"
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
    })
};