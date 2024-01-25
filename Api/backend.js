const express = require('express');
const app = express();
const port = 3333;
const moduleDB = require('./db.js');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const AdmZip = require('adm-zip');
const url = require('url');
const auth = require('./security.js');
const cookieParser = require('cookie-parser');
require('dotenv').config();


//? import des  fichier de routage
const authRouter = require('./auth.js');
const userRouter = require('./user.js');
const areaRouter = require('./area.js');
const oauth2Router = require('./oauth2.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bearerToken());
app.use(cookieParser());
app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/area', areaRouter);
app.use('/oauth', oauth2Router);

// Middleware pour ajouter le header 'Access-Control-Expose-Headers'
app.use((req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', 'x-access-token');
    next();
});

app.use(cors());


// creation d'un path de save pour la route /upload dans le dossier upload
const uploadDir = path.join(__dirname, 'images');

// Configuration de Multer pour gérer les fichiers
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', async (req, res) => {
    res.send("Welcome to the Area API");
});

// Fonction pour lister les routes
function listRoutes() {
    const routeList = [];
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            // routes régulières
            routeList.push(middleware.route.path);
        } else if (middleware.name === 'router') {
            // routes montées par le routeur
            middleware.handle.stack.forEach((handler) => {
                routeList.push(handler.route.path);
            });
        }
    });
    return routeList;
}

app.get('/routes', (req, res) => {
    const routes = listRoutes();
    res.json(routes);
});


//! all post request /////////////////////////////

app.post('/access-token', (req, res) => {
    const { id, secret } = req.body;

    moduleDB.sedQuerySelect('*', 'users', `api_id = \"${id}\" AND api_secret = \"${secret}\"`)
    .then((result) => {
        if (result.length != 1) {
            res.status(400).send("Error while generating token.");
        }
        const token = auth.getToken(result[0]).then((token) => {
            res.send(token.token);
        });
    })
});

app.post('/upload', upload.single('file'), async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {

            // upload image to image folder
            if (!req.file) {
                return res.status(400).json({ error: 'No files were uploaded.' });
            }
            const file = req.file;
            const encoded_name = encodeURIComponent(file.originalname);
            const filepaths = path.join(uploadDir, encoded_name);
            const user_id = req.body.user_id;

            // write file in upload folder
            fs.writeFile(filepaths, file.buffer, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Error while uploading file.' });
                }
                // insert file in database
                moduleDB.sedQueryInsert('image', '(`user_id`, `name`)', `\"${user_id}\", \"${encoded_name}\"`)
                .catch((error) => {
                    console.error(error);
                    return res.status(500).json({ error: 'Error while uploading file.' });
                });
                return res.status(200).json({ message: 'File uploaded successfully.' });
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

//! all get request /////////////////////////////


//! all delete request /////////////////////////////


//! /////////////////////////////




//! google oauth2 /////////////////////////////

function addGoogleCalendarEvent(accessToken, eventDetails) {
    // URL de l'API Google Calendar pour ajouter un événement au calendrier de l'utilisateur.
    const apiUrl = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

    // Configurez l'en-tête de la requête pour inclure le jeton d'accès.
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };

    // Définissez les détails de l'événement à ajouter.
    const event = {
        summary: eventDetails.summary,
        description: eventDetails.description,
        start: {
            dateTime: eventDetails.startDateTime,
            timeZone: 'UTC', // Remplacez par le fuseau horaire approprié.
        },
        end: {
            dateTime: eventDetails.endDateTime,
            timeZone: 'UTC', // Remplacez par le fuseau horaire approprié.
        },
    };

    // Effectuez une requête POST pour ajouter l'événement.
    return fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(event),
    })
    .then(response => response.json())
    .then(data => {
        // Traitez la réponse de l'ajout de l'événement ici.
        console.log('Événement ajouté au calendrier Google :', data);
        return data; // Retournez la réponse si nécessaire.
    })
    .catch(error => {
        // Gérez les erreurs ici.
        console.error('Erreur lors de l\'ajout de l\'événement au calendrier :', error);
        throw error;
    });
}

function getGoogleCalendarEvents(accessToken) {
    // URL de l'API Google Calendar pour obtenir la liste des événements de l'utilisateur.
    const apiUrl = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

    // Configurez l'en-tête de la requête pour inclure le jeton d'accès.
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    // Effectuez une requête GET vers l'API Google Calendar.
    return fetch(apiUrl, { headers })
        .then(response => (console.log('response:', response), response.json()))
        .then(data => {
            // Traitez les données des événements ici.
            console.log('Événements du calendrier Google :', data.items);
            return data.items; // Retournez les événements si nécessaire.
    })
    .catch(error => {
        // Gérez les erreurs ici.
        console.error('Erreur lors de la récupération des événements du calendrier :', error);
        throw error;
    });
}

app.get('/calendar', async (req, res) => {
    const user_id = 1;
    const infos = await moduleDB.sedQuerySelect('*', 'token_infos', `user_id = ${user_id}`);
    if (infos.length === 0) {
        res.status(400).json({msg: 'No google data found for this user.'});
    }
    console.log('infos:', infos);
    const googleData = JSON.parse(infos[0].google_data);
    if (googleData === undefined) {
        res.status(400).json({msg: 'No google data found for this user.'});
    }
    console.log('googleData:', googleData);
    console.log('googleData.accessToken:', googleData.accessToken)
    const eventDetails = {
        summary: 'Titre de l\'événement',
        description: 'Description de l\'événement',
        startDateTime: '2023-10-10T10:00:00Z', // Format ISO 8601 (UTC).
        endDateTime: '2023-10-10T11:00:00Z', // Format ISO 8601 (UTC).
    };
    addGoogleCalendarEvent(googleData.accessToken, eventDetails)
    getGoogleCalendarEvents(googleData.accessToken)
        .then(events => {
            res.status(200).json(events);
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

app.get('/calendar2', (req, res) => {
    getGoogleCalendarEvents(googleData.accessToken)
        .then(events => {
            res.status(200).json(events);
        })
        .catch(error => {
            res.status(500).json({ error });
    });
});

app.post('/toto', async (req, res) => {
    res.send(json({msg: 'ok'}));
    return;
    const { summary, description, startDateTime, endDateTime } = req.body;
    const eventDetails = {
        summary: 'salut tu vois ca a fonctionner',
        description: 'Description de l\'événement',
        startDateTime: '2023-10-11T10:00:00Z', // Format ISO 8601 (UTC).
        endDateTime: '2023-10-11T11:00:00Z', // Format ISO 8601 (UTC).
    };
    const data = await moduleDB.sedQuerySelect('*', 'token_infos', `user_id = 1`);
    console.log('data:', data);
    const googleData = JSON.parse(data[0].google_data);
    addGoogleCalendarEvent(googleData.accessToken, eventDetails);
    res.status(200).json({msg: 'ok'});
});

app.get('/get_info_calendar', async (req, res) => {
    const user_id = 1;
    const infos = await moduleDB.sedQuerySelect('*', 'token_infos', `user_id = ${user_id}`);
    if (infos.length === 0) {
        res.status(400).json({msg: 'No google data found for this user.'});
    }
    const googleData = JSON.parse(infos[0].google_data);
    if (googleData === undefined) {
        res.status(400).json({msg: 'No google data found for this user.'});
    }
    getGoogleCalendarEvents(googleData.accessToken)
        .then(events => {
            console.log('events:', events);
            res.status(202).json(events);
        })
        .catch(error => {
            res.status(500).json({ error });
    });
});

app.post('/reaction_test/:user_id', async (req, res) => {
    console.log('totototot');
    const user_id = req.params.user_id;

    const { titre, message } = req.body;

    const data = moduleDB.sedQueryInsert('notifications', '(`user_id`, `title`, `message`)', `\"${user_id}\", \"${titre}\", \"${message}\"`)
    .then((data) => {
        res.status(200).json({msg: 'ok'});
    })
    .catch((error) => {
        res.status(500).json({msg: 'error'});
    });
});

app.listen(port, () => {
    auth.tryToConnect();
    console.log(`Serveur démarré sur le port ${port}`);
});
