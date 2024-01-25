const express = require('express');
const router = express.Router();
const moduleDB = require('./db.js');
const auth = require('./security.js');
const cookieParser = require('cookie-parser');
const request = require('request');

// const REDIRECT_URI='http://localhost:8081/oauth/callback'
const REDIRECT_URI="https://api.area.tal-web.com/oauth/callback"

const SPOTIFY_CLIENT_ID=''
const SPOTIFY_CLIENT_SECRET=''

const GOOGLE_CLIENT_ID=''
const GOOGLE_CLIENT_SECRET=''

const TWITTER_CLIEN_ID=''
const TWITTER_CLIENT_SECRET=''

const DISCORD_CLIENT_ID=''
const DISCORD_CLIENT_SECRET=''

function calculate_expiration(time) {
    const expire_in_date = new Date();
    expire_in_date.setSeconds(expire_in_date.getSeconds() + time);

    const final_date = expire_in_date.getFullYear() + '-' + (expire_in_date.getMonth() + 1) + '-' + expire_in_date.getDate() + ' ' + (expire_in_date.getHours() + 1) + ':' + expire_in_date.getMinutes() + ':' + expire_in_date.getSeconds();

    return final_date;
}

//! all connect methods /////////////////////////////

function connect_to_spotify(token, res) {
    const spotifyUrl = 'https://accounts.spotify.com/authorize';
    const clientId = SPOTIFY_CLIENT_ID;
    const redirectUri = REDIRECT_URI;
    const scopes = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-top-read user-library-read user-library-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private streaming app-remote-control user-follow-read user-follow-modify';
    const state = "spotify" + "/" + token;
    const spotifyUrlWithParams = `${spotifyUrl}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}&state=${state}`;

    return spotifyUrlWithParams;
}

function connect_to_google(token, res) {
    console.log('on se connecte a google');

    const googleUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId = GOOGLE_CLIENT_ID;
    const redirectUri = REDIRECT_URI;
    var scopes = [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/fitness.activity.read',
        'https://www.googleapis.com/auth/fitness.activity.write',
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://mail.google.com/',
        'https://www.googleapis.com/auth/chat.messages',
        'https://www.googleapis.com/auth/documents',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/youtube'
    ]
    scopes = scopes.join(' ');
    const state = "google" + "/" + token;
    const access_type = 'offline';
    const googleUrlWithParams = `${googleUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code&state=${state}&access_type=${access_type}`;

    return googleUrlWithParams;
}

function connect_to_twitter(token, res) {
    const twitterUrl = 'https://twitter.com/i/oauth2/authorize';
    const clientId = TWITTER_CLIEN_ID;
    const redirectUri = REDIRECT_URI;
    const scopes = 'tweet.read users.read offline.access tweet.write';
    const state = "twitter" + "/" + token;
    const code_challenge = 'challenge';
    const code_challenge_method = 'plain';
    const twitterUrlWithParams = `${twitterUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code&state=${state}&code_challenge=${code_challenge}&code_challenge_method=${code_challenge_method}`;

    return twitterUrlWithParams;
}

function connect_to_discord(token, res) {
    const discordUrl = 'https://discord.com/api/oauth2/authorize';
    const clientId = DISCORD_CLIENT_ID;
    const redirectUri = REDIRECT_URI;
    const scopes = 'identify messages.read email guilds';
    const state = "discord" + "/" + token;
    const discordUrlWithParams = `${discordUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code&state=${state}`;

    return discordUrlWithParams;
}

const pointer_table = {
    "spotify": connect_to_spotify,
    "google": connect_to_google,
    "twitter": connect_to_twitter,
    "discord": connect_to_discord,
};

router.post('/login/:to', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const { to } = req.params;
            if (pointer_table[to] === undefined) {
                res.status(400).json({msg: 'Invalid service.'});
            } else {
                const redirect_uri = pointer_table[to](auth_token, res);
                res.cookie('token', auth_token);
                res.json({ redirect_uri });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

//! all callback methods /////////////////////////////

function callback_spotify(code) {
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer.from( SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
        json: true
    };

    return authOptions;
}

function callback_google(code) {
    var authOptions = {
        url: "https://oauth2.googleapis.com/token",
        form: {
            code: code,
            redirect_uri: REDIRECT_URI,
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            grant_type: "authorization_code",
        },
        json: true,
    };

    return authOptions;
}

function callback_discord(code) {
    var authOptions = {
        url: 'https://discord.com/api/oauth2/token',
        form: {
            code: code,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from( DISCORD_CLIENT_ID + ':' + DISCORD_CLIENT_SECRET).toString('base64'))
        },
        json: true
    };

    return authOptions;
}

function callback_twitter(code) {
    var authOptions = {
        url: 'https://api.twitter.com/2/oauth2/token',
        form: {
            code: code,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code',
            client_id: TWITTER_CLIEN_ID,
            code_verifier: 'challenge'
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from( TWITTER_CLIEN_ID + ':' + TWITTER_CLIENT_SECRET).toString('base64'))
        },
        json: true
    };

    return authOptions;
}

const pointer_table_callback = {
    "spotify": callback_spotify,
    "google": callback_google,
    "twitter": callback_twitter,
    "discord": callback_discord,
};

router.get('/callback/', async (req, res) => {
    const infos = req.query.state;
    const data = infos.split('/');
    const service = data[0];
    const token = data[1];
    const cookie = req.cookies['token'];

    if (token === undefined || service === undefined) {
        res.status(400).json({msg: 'Invalid parameters.'});
        return;
    }

    if (!(await auth.validateToken(token, "user"))) {
        res.status(401).send('You are not allowed to access this resource.');
        return;
    }

    const code = req.query.code;
    var user_id = await moduleDB.sedQuerySelect('user_id', 'auth_token', `token = '${token}'`);
    user_id = user_id[0].user_id;

    const authOptions = pointer_table_callback[service](code);

    console.log('authOptions:', authOptions);

    request.post(authOptions, async function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const {access_token, refresh_token, expires_in } = body;
            console.log("body:", body);
            body = JSON.stringify(body);
            body = "";
            console.log("refresh_token:", refresh_token)
            // le expire_in est en secondes il faut le convertir en date
            const expire_in_date = calculate_expiration(expires_in);

            const token_infos = await moduleDB.sedQuerySelect('*', 'token_infos', `user_id = ${user_id}`);
            // console.log('token_infos:', token_infos);

            if (token_infos.length === 0) {
                const insert1 = await moduleDB.sedQueryInsert('token_infos', `(user_id, token, expires_in, infos_for)`, `${user_id}, "", NULL, 'google'`);
                const insert2 = await moduleDB.sedQueryInsert('token_infos', `(user_id, token, expires_in, infos_for)`, `${user_id}, "", NULL, 'discord'`);
                const insert3 = await moduleDB.sedQueryInsert('token_infos', `(user_id, token, expires_in, infos_for)`, `${user_id}, "", NULL, 'github'`);
                const insert4 = await moduleDB.sedQueryInsert('token_infos', `(user_id, token, expires_in, infos_for)`, `${user_id}, "", NULL, 'twitter'`);
                const insert5 = await moduleDB.sedQueryInsert('token_infos', `(user_id, token, expires_in, infos_for)`, `${user_id}, "", NULL, 'lol'`);
                const insert6 = await moduleDB.sedQueryInsert('token_infos', `(user_id, token, expires_in, infos_for)`, `${user_id}, "", NULL, 'spotify'`);

                if (!insert1 || !insert2 || !insert3 || !insert4 || !insert5 || !insert6) {
                    res.status(500).send("Erreur lors de la création des informations du token.");
                    return;
                }
            }
            // save tokens in database
            const query = moduleDB.sedQueryUpdate('token_infos', `token = '${access_token}', data = '${body}', expires_in = '${expire_in_date}'` + (refresh_token != undefined ? `, refresh_token = '${refresh_token}'` : ``) , `user_id = ${user_id} AND infos_for = '${service}'`)
            .then((result) => {
                res.redirect('https://area.tal-web.com/mesApi');
            }).catch((error) => {
                console.log('error:', error);
                res.status(400).json({msg: error});
            });
        } else {
            // print error
            console.log('error:', error);
            res.status(400).json({msg: error});
        }
    });

});

//! all refresh methods

function send_reconnexion_request(service, user_id, authOptions, res) {
    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            access_token = body.access_token;
            refresh_token = body.refresh_token;
            expire_in = body.expire_in;

            moduleDB.sedQueryUpdate('token_infos', `token = '${access_token}', refresh_token = '${refresh_token}', data = '${body}'`, `user_id = ${user_id} AND infos_for = '${service}'`)
            .then((result) => {
                res.send('ok');
            }).catch((error) => {
                console.log('error:', error);
                res.status(400).json({msg: error});
            });
        }
    });
}

router.get('/reconnect_google', async function (req, res) {
    const user_id = req.headers.id;
    const refresh_token = await moduleDB.sedQuerySelect('refresh_token', 'token_infos', `user_id = ${user_id} AND infos_for = 'google'`);

    var authOptions = {
        url: 'https://oauth2.googleapis.com/token',
        form: {
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            refresh_token: refresh_token,
            grant_type: 'refresh_token',
        },
        json: true,
    };

    send_reconnexion_request('google', user_id, authOptions, res);
});

router.get('/reconnect_discord', async function (req, res) {
    const user_id = req.headers.id;
    const refresh_token = await moduleDB.sedQuerySelect('refresh_token', 'token_infos', `user_id = ${user_id} AND infos_for = 'discord'`);

    var authOptions = {
        url: 'https://discord.com/api/oauth2/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from( DISCORD_CLIENT_ID + ':' + DISCORD_CLIENT_SECRET).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    send_reconnexion_request('discord', user_id, authOptions, res);
});

router.get('/reconnect_spotify', async function (req, res) {
    const user_id = req.headers.id;
    const refresh_token = await moduleDB.sedQuerySelect('refresh_token', 'token_infos', `user_id = ${user_id} AND infos_for = 'spotify'`);

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from( SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    send_reconnexion_request('spotify', user_id, authOptions, res);
});

router.get('/reconnect_twitter', async function (req, res) {
    const user_id = req.headers.id;
    const refresh_token = await moduleDB.sedQuerySelect('refresh_token', 'token_infos', `user_id = ${user_id} AND infos_for = 'twitter'`);

    var authOptions = {
        url: 'https://api.twitter.com/2/oauth2/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from( TWITTER_CLIEN_ID + ':' + TWITTER_CLIENT_SECRET).toString('base64'))
        },
        form: {
            refresh_token: refresh_token,
            grant_type: 'refresh_token',
        },
        json: true
    };

    send_reconnexion_request('twitter', user_id, authOptions, res);
});

//! ///////////////

module.exports = router;