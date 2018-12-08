const db = require('../../database/db');
const {verifyAdmin} = require('./verifyAdmin');

exports.getFreelancers = (req, res) => {
    const {admin_key} = req.body;

    verifyAdmin(admin_key, () => {
        db.query('SELECT * FROM `Freelancer`', (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "admin get freelancers failed; database error"
            });

            const freelancers = JSON.parse(JSON.stringify(result));

            res.status(200).json({
                success: true,
                freelancers
            });
        });
    });
};

exports.getClients = (req, res) => {
    const {admin_key} = req.body;

    verifyAdmin(admin_key, () => {
        db.query('SELECT * FROM `Client`', (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "admin get clients failed; database error"
            });

            const clients = JSON.parse(JSON.stringify(result));

            res.status(200).json({
                success: true,
                clients
            });
        });
    });
};

exports.getAllUsers = (req, res) => {
    const {admin_key} = req.body;

    verifyAdmin(admin_key, () => {
        db.query('SELECT * FROM `Freelancer`', (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "admin get freelancers failed; database error"
            });

            const freelancers = JSON.parse(JSON.stringify(result));

            db.query('SELECT * FROM `Client`', (err, result) => {
                if (err) return res.status(400).json({
                    success: false,
                    error_message: "admin get clients failed; database error"
                });

                const clients = JSON.parse(JSON.stringify(result));

                res.status(200).json({
                    success: true,
                    freelancers,
                    clients
                });
            });
        });
    });
};

exports.getTeams = (req, res) => {
    const {admin_key} = req.body;

    verifyAdmin(admin_key, () => {
        db.query('SELECT * FROM `Team`', (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "admin get teams failed; database error"
            });

            const teams = JSON.parse(JSON.stringify(result));
            const leader_idxs = [];
            teams.forEach(team => leader_idxs.push(team.leader_idx));

            db.query('SELECT * FROM `Team_member`', (err, result) => {
                if (err) return res.status(400).json({
                    success: false,
                    error_message: "admin get team members failed; database error"
                });

                const team_members = JSON.parse(JSON.stringify(result));
                const member_idxs = [];
                team_members.forEach(member => member_idxs.push(member.freelancer_idx));

                const all_idxs = leader_idxs.concat(member_idxs);

                db.query('SELECT idx, email, name, age, major, phone, experience, rating FROM `Freelancer` WHERE `idx` IN (?)', all_idxs, (err, result) => {
                    if (err) return res.status(400).json({
                        success: false,
                        error_message: "admin get all team members failed; database error"
                    });

                    const all_list = JSON.parse(JSON.stringify(result));

                    const teams_final = [];

                    teams.forEach((team) => {
                        const leader = all_list.filter(person => person.idx === team.leader_idx)[0];

                        const this_team_members = team_members.filter(member => member.team_idx === team.idx);

                        const member_list = [];
                        if(this_team_members.length > 0) {
                            this_team_members.forEach((member) => {
                                const team_member_candidate = all_list.filter(candidate => candidate.idx === member.freelancer_idx);

                                if (team_member_candidate.length === 0) return;

                                const team_member = team_member_candidate[0];

                                if (team_member.idx === team.leader_idx) return;

                                member_list.push(team_member);
                            });
                        }

                        teams_final.push({
                            name: team.name,
                            comment: team.comment,
                            leader,
                            team_members: member_list
                        });

                        res.status(200).json({
                            success: true,
                            teams: teams_final
                        });
                    });
                });
            });
        });
    });
};

exports.getFreelancerByIdx = (req, res) => {
    const {admin_key, freelancer_idx} = req.body;

    verifyAdmin(admin_key, () => {
        db.query('SELECT idx, email, name, age, major, phone, experience, rating FROM `Freelancer` WHERE idx = ?', freelancer_idx, (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "admin get freelancer by idx failed; database error"
            });

            const freelancer = JSON.parse(JSON.stringify(result))[0];

            if (freelancer === undefined) {
                res.status(400).json({
                    success: false,
                    error_message: "admin get freelancer by idx failed; wrong idx"
                });
            } else {
                res.status(200).json({
                    success: true,
                    freelancer
                });
            }
        });
    });
};

exports.getClientByIdx = (req, res) => {
    const {admin_key, client_idx} = req.body;

    verifyAdmin(admin_key, () => {
        db.query('SELECT idx, email, name, phone, rating FROM `Client` WHERE idx = ?', client_idx, (err, result) => {
            if (err) return res.status(400).json({
                success: false,
                error_message: "admin get client by idx failed; database error"
            });

            const client = JSON.parse(JSON.stringify(result))[0];

            if (client === undefined) {
                res.status(400).json({
                    success: false,
                    error_message: "admin get client by idx failed; wrong idx"
                });
            } else {
                res.status(200).json({
                    success: true,
                    client
                });
            }
        });
    });
};