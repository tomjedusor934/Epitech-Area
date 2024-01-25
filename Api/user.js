const express = require('express');
const router = express.Router();
const path = require('path');
const moduleDB = require('./db.js');
const auth = require('./security.js');
const { route } = require('./auth.js');

// creation d'un path de save pour la route /upload dans le dossier upload
const uploadDir = path.join(__dirname, 'images');

//! all get methods

router.get('/infos', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const { username } = req.headers;

            moduleDB.sedQuerySelect('*', 'users', `username = \"${username}\"`)
                .then((result) => {
                    if (result.length === 0) {
                        res.status(400).send("Cet utilisateur n'existe pas.");
                    } else {
                        res.send(result[0]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send("Erreur lors de la récupération des informations de l'utilisateur.");
                });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

router.get('/image/:user_id', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const { user_id } = req.params;

            const images = await moduleDB.sedQuerySelect('*', 'image', `user_id = ${user_id}`);

            // find image in upload folder
            const image_path = path.join(uploadDir, images[0].name);
            if (!fs.existsSync(image_path)) {
                return res.status(500).json({ error: 'Image not found.' });
            }
            res.sendFile(image_path);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

router.get('/notifications/:user_id', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const { user_id } = req.params;

            const notifications = await moduleDB.sedQuerySelect('*', 'notifications', `user_id = ${user_id}`);

            res.send(notifications);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

router.get('/token_infos/:user_id/', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const { user_id } = req.params;

            const token_infos = await moduleDB.sedQuerySelect('*', 'token_infos', `user_id = ${user_id}`);

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
                const token_infos = await moduleDB.sedQuerySelect('*', 'token_infos', `user_id = ${user_id}`);
                res.send(token_infos);

            } else {
                res.send(token_infos);
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

//! ///////////////

//! all post methods

router.post('/token_infos/:user_id', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const { user_id } = req.params;
            const { token, expiration_in, for_what } = req.body;

            const token_infos = await moduleDB.sedQuerySelect('*', 'token_infos', `user_id = ${user_id} AND for_what = ${for_what}`);

            if (token_infos.length > 0) {
                res.status(400).json({ message: 'Token infos already exists.' });
                return;
            }

            moduleDB.sedQueryInsert('token_infos', `user_id, token, expiration_in, for_what`, `${user_id}, ${token}, ${expiration_in}, ${for_what}`)
            .then((result) => {
                res.json({ message: 'Token infos created successfully.' });
            }).catch((error) => {
                console.log(error);
                res.status(500).send("Erreur lors de la création des informations du token.");
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

//! ///////////////

//! all put methods

router.put('/token_infos/:user_id', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const { user_id } = req.params;
            const { token, expiration_in, for_what } = req.body;

            const token_infos = await moduleDB.sedQuerySelect('*', 'token_infos', `user_id = ${user_id} AND for_what = ${for_what}`);

            if (token_infos.length === 0) {
                res.status(400).json({ message: 'Token infos not found.' });
            } else {
                moduleDB.sedQueryUpdate('token_infos', `token = ${token}, expiration_in = ${expiration_in}`, `user_id = ${user_id} AND for_what = ${for_what}`)
                    .then((result) => {
                        res.json({ message: 'Token infos updated successfully.' });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).send("Erreur lors de la mise à jour des informations du token.");
                    });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

//! ///////////////

//! all delete methods

router.delete('/notification/:id', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        }
        const id = req.params.id;

        moduleDB.sedQueryDelete('notifications', `id = ${id}`)
        .then((result) => {
            res.json({ message: 'Notification deleted successfully.' });
        }).catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Page not found.' });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

//! ///////////////

module.exports = router;