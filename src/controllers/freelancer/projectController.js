const db = require('../../database/db');

exports.getAll = (req, res) => {
    db.query('SELECT * FROM `Internal_project` WHERE status = "available" ORDER BY registered_at DESC', (err, result) => {
        if (err) return res.status(400).json({
            success: false,
            error_message: "freelancer get all available internal projects failed; database error"
        });

        const projects = JSON.parse(JSON.stringify(result));

        res.status(200).json({
            success: true,
            projects
        });
    });
};

exports.getForMe = (req, res) => {
    const {freelancer_idx} = req.body;


};

exports.getInfo = (req, res) => {

};

exports.apply = (req, res) => {

};

exports.getApplied = (req, res) => {

};

exports.getCurrent = (req, res) => {

};