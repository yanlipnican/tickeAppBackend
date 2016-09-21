/*
* ----------------------------------
*	CMS by Jan Lipnican <yanlipnican@gmail.com>
* ----------------------------------
*/

import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import busBoy from 'express-busboy';
import helmet from 'helmet';
import fs from 'fs';
import * as db from './dbConnection';
import controllers from './controllers';
import models from './models';
import * as Valid from './validation';
import hash from './hash';
import middlewares from './middlewares';

global.fs = fs;
global.mongoose = mongoose;
global.models = models;
global.Valid = Valid;
global.hash = hash;
global.db = db;

global.appRoot = __dirname + '/../';

const app = express();
const PORT = 7002;

// helmet sets headers to be secure
app.use(helmet());

app.use(session({ secret: '1203()*(@(*dewt32&#)Haskdjh20', resave: true, saveUninitialized: true }));
app.use(express.static('public'));
busBoy.extend(app, {
	upload: true,
    path: appRoot + '/var/tmp/',
    allowedPath: /./,
    mimeTypeLimit: [
		'image/jpeg',
		'image/png'
	]
});

middlewares(app);
controllers(app);

// TODO middlewares(app);

app.listen(PORT, () => {
	console.log(`Project started.\nListening on port ${PORT}!`);
});