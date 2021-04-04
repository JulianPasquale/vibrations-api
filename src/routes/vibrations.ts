/**
 * Module dependencies.
 */

import { Router } from 'express';
import {
  listController,
  detailsController,
  createController,
  patternController,
  deleteController,
} from '../controllers/vibrations';

import retrieveVibration from '../middlewares/retrieveVibration';

/**
 * Create router
 */

const router = Router();

/**
 *  GET vibrations listing.
 */

router.get('/', listController);

/** 
 * POST create vibration.
 */

router.post('/', createController);

/**
 * GET vibration details.
 */

router.get('/:vibrationId', retrieveVibration, detailsController);

/**
 * GET vibration details in pattern format.
 */

router.get('/:vibrationId/pattern', retrieveVibration, patternController);

/**
 * DELETE vibration.
 */

router.delete('/:vibrationId', deleteController);

export default router;
