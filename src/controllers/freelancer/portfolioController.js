const db = require('../../database/db');

exports.getAll = (req, res) => {
    const {freelancer_idx, sort_scheme, asc_desc} = req.body;

    db.query("SELECT * FROM `Completed_project` WHERE freelancer_idx = ? ORDER BY ? ?", [freelancer_idx, sort_scheme, asc_desc], (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer get completed internal projects failed; database error"
        });

        const internal = JSON.parse(JSON.stringify(result));

        db.query("SELECT * FROM `External_project` WHERE freelancer_idx = ? ORDER BY ? ?", [freelancer_idx, sort_scheme, asc_desc], (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "freelancer get completed external projects failed; database error"
            });

            const external = JSON.parse(JSON.stringify(result));

            res.status(200).json({
                success: true,
                internal,
                external
            });
        });
    });
};

exports.getInternal = (req, res) => {
    const {freelancer_idx, sort_scheme, asc_desc} = req.body;

    db.query("SELECT * FROM `Completed_project` WHERE freelancer_idx = ? ORDER BY ? ?", [freelancer_idx, sort_scheme, asc_desc], (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer get completed internal projects failed; database error"
        });

        const internal = JSON.parse(JSON.stringify(result));

        res.status(200).json({
            success: true,
            internal
        });
    });
};

exports.getExternal = (req, res) => {
    const {freelancer_idx, sort_scheme, asc_desc} = req.body;

    db.query("SELECT * FROM `External_project` WHERE freelancer_idx = ? ORDER BY ? ?", [freelancer_idx, sort_scheme, asc_desc], (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer get completed external projects failed; database error"
        });

        const external = JSON.parse(JSON.stringify(result));

        res.status(200).json({
            success: true,
            external
        });
    });
};

exports.registerExternal = (req, res) => {
    const {freelancer_idx, start_date, end_date, pay, attachment, comment} = req.body;
    let newProject = {freelancer_idx, start_date, end_date, pay, attachment, comment};
    Object.keys(newProject).forEach(key => newProject[key] === undefined && delete newProject[key]);

    db.query("INSERT INTO `External_project` SET ?", newProject, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer register external project failed; database error"
        });

        res.status(200).json({
            success: true
        });
    });
};