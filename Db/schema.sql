-- CREATE DATABASE `main_site`;
use area51;

/*
This SQL script creates a table named "users" with the following columns:
- id: an auto-incremented integer that serves as the primary key
- username: a non-null string that represents the user's username
- password: a non-null string that represents the user's password
- birth_date: a date that represents the user's birth date
- name: a string that represents the user's name
- surname: a string that represents the user's surname
- sexe: an enum that represents the user's gender, with possible values of 'homme' or 'femme'
- created_at: a timestamp that represents the date and time the user was created
- updated_at: a timestamp that represents the date and time the user was last updated
- deleted_at: a timestamp that represents the date and time the user was deleted
- role: an enum that represents the user's role, with possible values of 'user', 'admin', or 'super-admin'
- api_id: a string that represents the user's API ID, which is unique
- api_secret: a string that represents the user's API secret

The table uses the InnoDB engine, has a default character set of latin1, and sets the auto-increment value to 1.
*/
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birth_date` date,
  `name` varchar(50),
  `surname` varchar(50),
  `sexe` enum('homme', 'femme') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `role` enum('user','admin','super-admin') NOT NULL DEFAULT 'user',
  `api_id` varchar(125) DEFAULT NULL,
  `api_secret` varchar(125) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_id` (`api_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

/*
Creates a table named `auth_token` with columns `token`, `created_at`, `expire_at`, and `user_id`.
`token` is a string of maximum length 150 and cannot be null.
`created_at` is a timestamp that cannot be null and is set to the current timestamp by default.
`expire_at` is a timestamp that cannot be null and is set to the current timestamp plus one day by default.
`user_id` is an integer of length 11 and cannot be null.
The primary key is `token` and there is a foreign key constraint on `user_id` that references the `id` column of the `users` table.
The table uses the InnoDB engine and the latin1 character set.
*/
CREATE TABLE `auth_token` (
  `token` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expire_at` timestamp NOT NULL DEFAULT DATE_ADD(current_timestamp(), INTERVAL 1 DAY),
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`token`),
  FOREIGN KEY (`user_id`) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*
  FILEPATH: /home/tom/teck/3e annee/web/Area/Db/schema.sql

  Creates a table named 'area' with the following columns:
  - id: integer, auto-incremented, not null
  - name: varchar(50), not null, unique
  - description: varchar(255), not null

  The table uses the InnoDB engine, has an initial auto-increment value of 1, and uses the latin1 character set.
*/
CREATE TABLE `area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `nb_user_input` int(11) NOT NULL DEFAULT 0,
  `common_type` enum('action', 'reaction', 'transformation') NOT NULL DEFAULT 'action',
  `service` enum('google', 'discord', 'github', 'twitter', 'lol', 'spotify', 'nothing') NOT NULL DEFAULT 'nothing',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

/*
This SQL script creates a table named "link" with the following columns:
- id: an auto-incremented integer that serves as the primary key
- link_nb: an integer that represents the link number
- area_block_id: an integer that represents the area block ID
- action_id: an integer that represents the action ID and is a foreign key referencing the "id" column of the "area" table
- reaction_id: an integer that represents the reaction ID and is a foreign key referencing the "id" column of the "area" table
- user_id: an integer that represents the user ID and is a foreign key referencing the "id" column of the "users" table
- time_check: an enumeration that represents the time interval for checking the link, with default value "every 5 minutes"
The table uses the InnoDB engine and has a default character set of latin1.
*/
CREATE TABLE `link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link_nb` int(11) NOT NULL,
  `area_block_id` int(11) NOT NULL,
  `action_id` int(11) NOT NULL,
  `reaction_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `time_check` enum('every minute','every 5 minutes','every 10 minutes','every 15 minutes','every 30 minutes','every 1 hour','every 2 hours','every 3 hours','every 4 hours','every 5 hours','every 10 hours','every 24 hours') NOT NULL DEFAULT 'every 5 minutes',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `params_for_action` varchar(255) DEFAULT NULL,
  `params_for_reaction` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`action_id`) REFERENCES area (id),
  FOREIGN KEY (`reaction_id`) REFERENCES area (id),
  FOREIGN KEY (`user_id`) REFERENCES users (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- This script creates a table named `steps_of_area` with the following columns:
-- `id`: an auto-incremented integer representing the unique identifier of each step.
-- `area_id`: an integer representing the identifier of the area to which the step belongs.
-- `step_nb`: an integer representing the order of the step within the area.
-- `type`: an enumeration representing the type of the step, which can be 'action', 'reaction', or 'transformation'.
-- `method`: an enumeration representing the HTTP method used by the step, which can be 'GET', 'POST', 'PUT', 'DELETE', or 'NOTHING'.
-- `url`: a string representing the URL used by the step.
-- `body`: a string representing the body of the request used by the step.
-- `headers`: a string representing the headers of the request used by the step.
-- `transformation_function`: a string representing the name of the transformation function used by the step.
-- `transformation_params`: a string representing the parameters of the transformation function used by the step.
-- The table has a primary key on the `id` column and a foreign key on the `area_id` column referencing the `id` column of the `area` table.
CREATE TABLE `steps_of_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `area_id` int(11) NOT NULL,
  `step_nb` int(11) NOT NULL,
  `type` enum('action','reaction', 'transformation') NOT NULL,
  `method` enum('GET','POST','PUT','DELETE', 'NOTHING') NOT NULL DEFAULT 'NOTHING',
  `url` varchar(255) DEFAULT NULL,
  `body` varchar(255) DEFAULT NULL,
  `headers` varchar(255) DEFAULT NULL,
  `transformation_function` varchar(255) DEFAULT NULL,
  `transformation_params` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`area_id`) REFERENCES area (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- Creates a table named `logical_contraint` with columns `id`, `first_link_id`, `second_link_id`, and `logical_operator`.
-- `id` is an auto-incrementing integer and serves as the primary key.
-- `first_link_id` and `second_link_id` are foreign keys that reference the `id` column of the `link` table.
-- `logical_operator` is an enumeration that can only have the values 'AND' or 'OR'.
CREATE TABLE `logical_contraint` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_link_id` int(11) NOT NULL,
  `second_link_id` int(11) NOT NULL,
  `logical_operator` enum('AND','OR') NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`first_link_id`) REFERENCES link (id),
  FOREIGN KEY (`second_link_id`) REFERENCES link (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- This table stores the likes of areas by users.
CREATE TABLE `area_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `area_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`area_id`) REFERENCES area (id),
  FOREIGN KEY (`user_id`) REFERENCES users (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- Creates the `notifications` table which stores notifications for users.
-- `id` is the primary key of the table and is auto-incremented for each new notification.
-- `user_id` is the foreign key referencing the `id` column of the `users` table.
-- `title` and `message` are the notification title and message respectively.
-- `created_at` is the timestamp of when the notification was created.
-- `read_at` is the timestamp of when the notification was read by the user.
-- The table uses the InnoDB engine and the latin1 character set.
CREATE TABLE `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `read_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- This SQL script creates a table named `images` in the database.
-- The table has columns `id`, `name`, and `user_id`.
-- `id` is an auto-incrementing integer and is the primary key of the table.
-- `name` is a non-null string that represents the name of the image.
-- `user_id` is a non-null integer that represents the user who uploaded the image.
-- The table uses the InnoDB engine and has a default character set of latin1.
-- The `user_id` column is a foreign key that references the `id` column of the `users` table.
CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `token_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `data` varchar(500) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `expires_in` timestamp NULL DEFAULT current_timestamp(),
  `infos_for` enum('google', 'discord', 'github', 'twitter', 'lol', 'spotify') NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

LOCK TABLES `token_infos` WRITE;

INSERT INTO `token_infos` VALUES (1, 1, "", "", "", NULL, 'google'),
    (2, 1, "", "", "", NULL, 'discord'),
    (3, 1, "", "", "", NULL, 'github'),
    (4, 1, "", "", "", NULL, 'twitter'),
    (5, 1, "", "", "", NULL, 'lol'),
    (6, 1, "", "", "", NULL, 'spotify');

UNLOCK TABLES;

CREATE TABLE `area_logs` (
  id int(11) NOT NULL AUTO_INCREMENT,
  link_id int(11) NOT NULL,
  message varchar(255) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  level enum('info', 'warning', 'error') NOT NULL DEFAULT 'info',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`link_id`) REFERENCES link (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


CREATE TABLE `special_params` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

LOCK TABLES `special_params` WRITE;

INSERT INTO `special_params` values (1, "$return_value", "This is when you need to get the previous return value maybe you can use it in transormation params etc"),
    (2, "$token_google", "Take the google token of the user who created the area_block"),
    (3, "$token_lol", "Take the league of legend token of the user who created the area_block"),
    (4, "$token_discord", "Take the discord token of the user who created the area_block"),
    (5, "$token_twitter", "Take the twitter token of the user who created the area_block"),
    (6, "$token_github", "Take the github token of the user who created the area_block"),
    (7, "$token_spotify", "Take the spotify token of the user who created the area_block"),
    (8, "$input1", "Take the first user input in the block area"),
    (9, "$input2", "Take the second user input in the block area"),
    (10, "$input3", "Take the third user input in the block area"),
    (11, "$user_id", "Take the user id of the user who created the area_block"),
    (12, "$today", "Get the current day formated like: YYYY-MM-DD"),
    (13, "$yesterday", "Get the previous day formated like YYYY-MM-DD")
    ;

UNLOCK TABLES;

CREATE TABLE `transformation_function` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `nb_params` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

LOCK TABLES `transformation_function` WRITE;

INSERT INTO `transformation_function` (`name`, `nb_params`) VALUES
    ('addPrefix', 2),
    ('addSuffix', 2),
    ('reverseString', 1),
    ('upperString', 1),
    ('lowerString', 1),
    ('translateString', 2),
    ('snakeCase', 1),
    ('camelCase', 1),
    ('kebabCase', 1),
    ('removeWhiteSpace', 1),
    ('toFahrenheit', 1),
    ('toCelsius', 1),
    ('KmtoMile', 1),
    ('MiletoKm', 1),
    ('CmtoInch', 1),
    ('InchtoCm', 1),
    ('MtoKm', 1),
    ('KmtoM', 1),
    ('MtoCm', 1),
    ('CmtoM', 1),
    ('KgtoPound', 1),
    ('PoundtoKg', 1),
    ('GtoKG', 1),
    ('KGtoG', 1),
    ('MintoHour', 1),
    ('HourtoMin', 1),
    ('create_string', 1),
    ('get_part_of_response', 2),
    ('get_all_keys', 2),
    ('get_first_key', 1),
    ('is_one_value_lower', 2),
    ('is_one_value_upper', 2),
    ('is_all_value_lower', 2),
    ('is_all_value_upper', 2),
    ('addFormulaToNumber', 2),
    ('subFormulaToNumber', 2),
    ('mulFormulaToNumber', 2),
    ('divFormulaToNumber', 2),
    ('powFormulaToNumber', 2),
    ('get_rawg_last_games', 2),
    ('get_station_ids', 2)
    ;

UNLOCK TABLES;