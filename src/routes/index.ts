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

router.get('/:vibrationId', detailsHandler);

/**
 * GET vibration details in pattern format.
 */

router.get('/:vibrationId/pattern', patternHandler);

/**
 * DELETE vibration.
 */

router.delete('/:vibrationId', deleteHandler);

export default router;
