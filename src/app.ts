/**
 * Module dependencies.
 */

import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

/**
 * Routers.
 */

import VibrationsRouter from './routes';

/**
 * Create express app.
 */

const app = express();

/**
 * Configure middlewares.
 */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Application routes.
 */

app.use('/vibrations', VibrationsRouter);

export default app;
