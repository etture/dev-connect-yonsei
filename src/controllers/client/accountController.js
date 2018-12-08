const db = require('../../database/db');

exports.getInfo = (req, res) => {
    const {client_idx} = req.body;

    db.query('SELECT idx, email, name, phone, rating FROM client WHERE idx = ?', client_idx, (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "client get info failed; database error"
        });

        const info = JSON.parse(JSON.stringify(result));

        res.status(200).json({
            success: true,
            info
        });
    });
};

exports.modify = (req, res) => {
    const {freelancer_idx: client_idx} = req.body;
    const {password, name, phone} = req.body;
    let modified = {password, name, phone};
    Object.keys(modified).forEach(key => modified[key] === undefined && delete modified[key]);

    db.query("UPDATE `Client` SET ? WHERE idx = ?", [modified, client_idx], (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "client modify failed; database error"
        });

        res.status(200).json({
            success: true
        });
    });
};