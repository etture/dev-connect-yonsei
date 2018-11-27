const mysql = require('mysql');

const mysql_conn = process.env.JAWSDB_URL || require('./mysql_connection');

const connection = mysql.createConnection(mysql_conn);

connection.connect((err) => {
    if (err) {
        console.log('error:', err);
    } else {
        console.log('DB connected!');
    }
});

module.exports = connection;