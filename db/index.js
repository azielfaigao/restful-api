const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'expressjs',
    password: 'pass',
    database: 'expressjs'
});

connection.connect((err) => {
    if (err) { throw err };
    console.log('CONNECTED TO DATABASE');
});

const db = {
    createTable: () => {
        const sql = "CREATE TABLE test_table (id INT AUTO_INCREMENT, firstname VARCHAR(80), lastname VARCHAR(80), PRIMARY KEY(id));"
        connection.query(sql, (err) => {
            if (err) { throw err };
            console.log('Table created successfully')
        });
    },
    getAll: () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM test_table'
            connection.query(sql, (err, result) => {
                if (err) { return reject(err) };
                return resolve(result);
            });
        });
    },
    insertData: () => {
        return new Promise((resolve, reject) => {
            const data = {
                firstname: 'David',
                lastname: 'Paterson'
            };
            const sql = 'INSERT INTO test_table SET ?';
            connection.query(sql, data, (err) => {
                if (err) { return reject(err) };
                return resolve('DATA INSERTED');
            });
        });
    },
    updateData: (id) => {
        return new Promise((resolve, reject) => {
            const data = {
                id: id,
                firstname: 'Jude',
                lastname: 'Paterson'
            };
            const sql = 'REPLACE INTO test_table SET ?';
            connection.query(sql, data, (err) => {
                if (err) { return reject(err) };
                return resolve('DATA UPDATED');
            });
        });
    },
    deleteData: (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM test_table WHERE id = ?';
            connection.query(sql, id, (err) => {
                if (err) { return reject(err) };
                return resolve('DATA DELETED');
            });
        });
    }
};

module.exports = db;