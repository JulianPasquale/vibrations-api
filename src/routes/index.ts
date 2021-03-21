/**
 * Module dependencies.
 */

import { Router } from 'express';
import {
  listHandler,
  detailsHandler,
  createHandler,
  patternHandler,
  deleteHandler,
} from '../handlers/vibrations';

import retrieveVibration from '../middlewares/retrieveVibration';

/**
 * Create router
 */

const router = Router();

/**
 *  GET vibrations listing.
 */

router.get('/', listHandler);

/** 
 * POST create vibration.
 */

router.post('/', createHandler);

/**
 * GET vibration details.
 */

router.get('/:vibrationId', retrieveVibration, detailsHandler);

/**
 * GET vibration details in pattern format.
 */

router.get('/:vibrationId/pattern', retrieveVibration, patternHandler);

/**
 * DELETE vibration.
 */

router.delete('/:vibrationId', deleteHandler);

export default router;
