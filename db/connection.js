const mysql = require('mysql2');
const password = require('../passwords');

// connect to database 
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: password,
        database: 'employee_tracker'
    },
    console.log('Connected to the employee_tracker database.')
);

module.exports = db;