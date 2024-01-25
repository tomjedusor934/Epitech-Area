const moduleDB = require('./db.js');
const crypto = require('crypto');

const permissions = [
    "user",
    "admin",
    "super-admin"
];

function tryToConnect() {
    try {
        moduleDB.connectToDb();
    } catch (error) {
        console.log(error);
    }
}

async function validateToken(token, is_granted_as = "super-admin") {

    if (!token) {
        return false;
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    try {
        const result = await moduleDB.sedQuerySelect('*', 'auth_token', `token = \"${token}\"`);
        if (result.length !== 1 || result[0].expire_at < new Date()) {
            return false;
        }
        const user_permissions = await moduleDB.sedQuerySelect('role', 'users', `id = ${result[0].user_id}`);

        if (permissions.indexOf(user_permissions[0].role) < permissions.indexOf(is_granted_as)) {
            return false;
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

function generateToken(length) {
    if (length > 150) {
        length = 150;
    }
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

function generateApiSecret() {
    return generateToken(50);
}

function generateApiId() {
    return generateToken(50);
}

async function getToken(user, token = null) {

    if (!token) {
        const token_for_user = await moduleDB.sedQuerySelect('*', 'auth_token', `user_id = ${user.id}`);
        if (token_for_user.length > 0) {
            const date = new Date();
            for (let i = 0; i < token_for_user.length; i++) {
                if (token_for_user[i].expire_at > date) {
                    token = token_for_user[i];
                    break;
                }
            }
        }
    }

    if (!token || token.expiryDate < new Date()) {
        // expire in 1 minute
        // expiryDate: new Date(new Date().getTime() + 60 * 60 * 1000),
        console.log("on genere un nouveau token");
        token = {
            token: generateToken(150),
            expiryDate: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
            user_id: user.id
        };
        moduleDB.updateToken(token);
        return token;
    }

    return token;
}

module.exports = {
    tryToConnect,
    validateToken,
    generateApiSecret,
    generateApiId,
    getToken
};