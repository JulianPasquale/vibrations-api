/**
 * Module dependencies.
 */

import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

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
app.use(cors());

/**
 * Application routes.
 */

app.use('/vibrations', VibrationsRouter);

export default app;
