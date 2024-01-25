const express = require('express');
const router = express.Router();
const moduleDB = require('./db.js');
const auth = require('./security.js');
const { route } = require('./auth.js');

//! all get methods

router.get('/', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const { user_id } = req.headers;

            moduleDB.sedQuerySelect('*', 'area')
                .then((result) => {
                    res.send(result);
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

router.get('/for/:user_id', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const { user_id } = req.params;
            const areas = await moduleDB.sedQuerySelect('*', 'link', `user_id = ${user_id}`);

            // create a list of area sorted by area_block_id
            const areas_sorted = [];

            for (let i = 0; i < areas.length; i++) {
                if (areas_sorted[areas[i].area_block_id] === undefined) {
                    areas_sorted[areas[i].area_block_id] = [];
                }
                areas_sorted[areas[i].area_block_id].push(areas[i]);
            }

            // remove undefined values
            for (let i = 0; i < areas_sorted.length; i++) {
                if (areas_sorted[i] === undefined) {
                    areas_sorted.splice(i, 1);
                    i--;
                }
            }

            // sorted area by link_nb
            for (let i = 0; i < areas_sorted.length; i++) {
                areas_sorted[i].sort((a, b) => {
                    return a.link_nb - b.link_nb;
                });
            }

            // get all area_block name in block_name
            for (let i = 0; i < areas_sorted.length; i++) {
                for (let j = 0; j < areas_sorted[i].length; j++) {
                    const block = await moduleDB.sedQuerySelect('*', 'block_name', `block_id = ${areas_sorted[i][j].id}`);
                    if (block.length != 0) {
                        areas_sorted[i][j].block_name = block[0].name;
                        areas_sorted[i][j].block_desc = block[0].desc;
                        break;
                    }
                }
            }
            console.log(areas_sorted);
            res.send(areas_sorted);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

router.get('/last_block_id/:user_id', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const { user_id } = req.params;

            const last_block_id = await moduleDB.sedQuerySelect('MAX(area_block_id) AS last_block_id', 'link', `user_id = ${user_id}`);

            if (last_block_id === undefined || last_block_id.length === 0 || last_block_id[0].last_block_id === null) {
                res.json(0);
            } else {
                res.json(last_block_id[0].last_block_id);
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});


router.get('/like/:user_id', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const { user_id } = req.params;

            const areas = await moduleDB.sedQuerySelect('*', 'area_like', `user_id = ${user_id}`);

            res.send(areas);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

router.get('/like/:area_id', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const { area_id } = req.params;

            const areas = await moduleDB.sedQuerySelect('*', 'area_like', `area_id = ${area_id}`);
            const count = areas.length;

            res.send(count);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

router.get('/special_params', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const special_params = await moduleDB.sedQuerySelect('*', 'special_params');

            res.send(special_params);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

router.get('/transformation_functions', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const transformation_function = await moduleDB.sedQuerySelect('*', 'transformation_function');

            res.send(transformation_function);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

router.get('/id', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const { id } = req.headers;
            const infos_area = await moduleDB.sedQuerySelect('*', 'area', `id = ${id}`);
            const steps = await moduleDB.sedQuerySelect('*', 'steps_of_area', `area_id = ${id}`);
            const area = {
                infos_area: infos_area[0],
                steps: steps
            };
            res.send(area);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

router.get('/last_link_id', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const last_link_id = await moduleDB.sedQuerySelect('MAX(id) AS last_link_id', 'link');

            if (last_link_id === undefined || last_link_id.length === 0 || last_link_id[0].last_link_id === null) {
                res.json(0);
            } else {
                res.json(last_link_id[0].last_link_id + 1);
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

//! ///////////////

//! all post methods

router.post('/', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const { name, description, nb_user_input, common_type, service } = req.body;

            moduleDB.sedQueryInsert("area", '(`name`, `description`, `nb_user_input`, `common_type`, `service`)', `\"${name}\", \"${description}\", \"${nb_user_input}\", \"${common_type}\", \"${service}\"`)
            .then((result) => {
                // get the id of the area created
                moduleDB.sedQuerySelect('id', 'area', `name = \"${name}\"`).then((result) => {
                    res.json({ message: 'Area created successfully.', id: result[0].id });
                }).catch((error) => {
                    console.error(error);
                    res.status(500).json({ message: 'Error while creating area.' });
                });
            }).catch((error) => {
                console.error(error);
                res.status(500).json({ message: 'Error while creating area.' });
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

router.post('/link', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const { link_nb, area_block_id, action_id, reaction_id, user_id, time_check, is_active, params_for_action, params_for_reaction } = req.body;

            moduleDB.sedQueryInsert('link', '(`link_nb`, `area_block_id`, `action_id`, `reaction_id`, `user_id`, `time_check`, `is_active`, `params_for_action`, `params_for_reaction`)', `\"${link_nb}\", \"${area_block_id}\", \"${action_id}\", \"${reaction_id}\", \"${user_id}\", \"${time_check}\", \"${is_active}\", \"${params_for_action}\", \"${params_for_reaction }\"`)
            .then((result) => {
                res.json({ message: 'Link created successfully.' });
            }).catch((error) => {
                console.error(error);
                res.status(500).json({ message: 'Error while creating link.' });
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

router.post('/add_step', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token, "user"))) {
            res.status(401).json({ message: 'You are not allowed to access this resource.' });
        }
        const {area_id, step_nb, type, method, url, body, headers, transformation_function, transformation_params} = req.body;

        if (area_id === undefined || area_id == 0 || step_nb === undefined || type === undefined) {
            res.status(400).json({ message: "The request is not valid please verify your parameters." });
            return;
        }
        const steps = await moduleDB.sedQuerySelect('*', 'steps_of_area', `area_id = ${area_id} AND step_nb = ${step_nb}`);
        if (steps.length > 0) {
            res.status(400).json({ message: "This step already exists please fix this." });
            return;
        }
        moduleDB.sedQueryInsert('steps_of_area', '(`area_id`, `step_nb`, `type`, `method`, `url`, `body`, `headers`, `transformation_function`, `transformation_params`)', `\"${area_id}\", \"${step_nb}\", \"${type}\", \"${method}\", \"${url}\", \"${body}\", \"${headers}\", \"${transformation_function}\", \"${transformation_params}\"`)
        .then((result) => {
            res.json({ message: 'Step added successfully.' });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: error });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

router.post('/add_block_name', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token))) {
            res.status(401).json({ message: 'You are not allowed to access this resource.' });
        } else {
            const { link_id, block_name, block_desc } = req.body;

            if (link_id === undefined || link_id == 0 || block_name === undefined) {
                res.status(400).json({ message: "The request is not valid please verify your parameters." });
                return;
            }

            const block = await moduleDB.sedQuerySelect('*', 'area_block', `id = ${link_id}`);

            if (block.length > 0) {
                res.status(400).json({ message: "This block already exists please fix this." });
                return;
            }

            moduleDB.sedQueryInsert('area_block', '(`block_id`, `name`, `description`)', `\"${link_id}\", \"${block_name}\", \"${block_desc}\"`)
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

//! ///////////////

//! all put methods

router.put('/update_area_state/:area_id', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const area_id = req.params;
            const is_active = req.body;

            const all_link_of_area = await moduleDB.sedQuerySelect('*', 'link', `area_id = ${area_id}`);

            for (let i = 0; i < all_link_of_area.length; i++) {
                const link = all_link_of_area[i];
                moduleDB.sedQueryUpdate('link', `is_active = ${is_active}`, `id = ${link.id}`);
            }
            const msg = is_active ? 'Area activated successfully.' : 'Area deactivated successfully.';
            res.json({ message: msg });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

//! ///////////////

//! all delete methods

router.delete('/:id', async (req, res) => {
    const auth_token = req.headers.authorization ?? null;

    try {
        if (!(await auth.validateToken(auth_token))) {
            res.status(401).send('You are not allowed to access this resource.');
        } else {
            const { id } = req.params;

            const delete_area = await moduleDB.sedQueryDelete('area', `id = ${id}`);
            const delete_steps = await moduleDB.sedQueryDelete('steps_of_area', `area_id = ${id}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Page not found.' });
    }
});

//! ///////////////

module.exports = router;