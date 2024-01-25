const mysql = require('mysql');
require('dotenv').config();

let connection = undefined;


module.exports = {
    connectToDb() {
        connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB
        });

        connection.connect((err) => {
            if (err) {
                console.error('Erreur de connexion à la base de données :', err);
                setTimeout(this.connectToDb, 2000);
            } else {
                console.log('Connexion à la base de données établie');
            }
        });

        connection.on('error', (err) => {
            console.error('Erreur de connexion à la base de données :', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('La connexion à la base de données a été perdue');
            } else {
                if (err.code === 'PROTOCOL_ENQUEUE_HANDSHAKE_TWICE') {
                    return 'ALREADY_CONNECTED';
                } else if (err.code === 'ECONNRESET') {
                    connection.end();
                } else {
                    throw err;
                }
            }
        });

        connection.on('end', () => {
            console.error('Connexion à la base de données terminée');
            this.connectToDb();
        });

        return connection;
    },

    async sedQuerySelect(what, from, where = '', sort = '') {
        const query = `SELECT ${what} FROM ${from}` + (where != '' ? ` WHERE ${where}` : '') + (sort != '' ? ` ORDER BY ${sort}` : '');

        return new Promise((resolve, reject) => {
            connection.query(query, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    },

    async sedQueryInsert(into, data, values) {
        const query = `INSERT INTO ${into} ` + (data ? data : '') + `VALUES (${values})`;

        return new Promise((resolve, reject) => {
            connection.query(query, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    },

    async sedQueryUpdate(table, set, where) {
        const query = `UPDATE ${table} SET ${set} WHERE ${where}`;

        return new Promise((resolve, reject) => {
            connection.query(query, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    },

    async sedQueryDelete(from, where) {
        const query = `DELETE FROM ${from} WHERE ${where}`;

        return new Promise((resolve, reject) => {
            connection.query(query, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    },

    updateToken: (token) => {
        const query = `INSERT INTO auth_token (token, expire_at, user_id) VALUES (?, ?, ?)`;
        const values = [token.token, token.expiryDate, token.user_id];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    },

    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users`;
            connection.query(query, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    },

    createUser: (user) => {
        const query = `INSERT INTO users (username, password, api_id, api_secret) VALUES (?, ?, ?, ?)`;
        const values = [user.username, user.password, user.api_id, user.api_secret];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    },

    checkIfuserAlreadyExists: (username) => {
        const query = `SELECT * FROM users WHERE username = ?`;
        const values = [username];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        }
        );
    },
}
