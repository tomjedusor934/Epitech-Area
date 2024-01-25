const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const moduleDB = require('./db.js');
const auth = require('./security.js');


// Middleware pour ajouter le header 'Access-Control-Expose-Headers'
router.use((req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', 'x-access-token');
    next();
});

//! all get methods

//! ///////////////

//! all post methods

router.post('/createUser', async (req, res) => {
    try {
        const { username, password } = req.body;

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.log(err);
                res.status(400).send("Erreur lors du chiffrement du mot de passe.");
            } else {
                const user = {
                    id: null,
                    username: username,
                    password: hashedPassword,
                    api_id: auth.generateApiId(),
                    api_secret: auth.generateApiSecret(),
                };

                moduleDB.checkIfuserAlreadyExists(user.username)
                    .then((result) => {
                        if (result.length > 0) {
                            res.status(400).send("Cet utilisateur existe déjà.");
                        } else {
                            return moduleDB.createUser(user)
                                .then(() => {
                                    res.send("Utilisateur créé avec succès !");
                                })
                                .catch((error) => {
                                    console.log(error);
                                    res.status(500).send("Erreur lors de la création de l'utilisateur.");
                                });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).send("Erreur lors de la création de l'utilisateur.");
                    });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username);

    moduleDB.checkIfuserAlreadyExists(username)
        .then((result) => {
            if (result.length === 0) {
                res.status(400).send("Cet utilisateur n'existe pas.");
            } else {
                const user = result[0];
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send("Erreur lors de la comparaison des mots de passe.");
                    } else {
                        console.log(result);
                        if (result) {
                            const response = res;
                            const token = auth.getToken(user).then((token, response) => {
                                res.set('x-access-token', token.token);
                                res.set('id', user.id);
                                res.json({msg: 'connected'});
                            });
                        } else {
                            res.status(400).send("Mot de passe incorrect.");
                            console.log("Mot de passe incorrect.");
                        }
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Erreur lors de la connexion de l'utilisateur.");
        });
});

//! all put methods

//! ///////////////

//! all delete methods

//! ///////////////

module.exports = router;