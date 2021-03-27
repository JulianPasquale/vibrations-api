/**
 * Module dependencies.
 */

import { Request, Response, NextFunction } from 'express';
import patternSamples from './samples';
import DutyCycle, { DUTY_CYCLES } from './duty_cycle';

/**
 * temporary fixed
 */
// const DURATION = 1000;

/**
 * Get vibrations details in pattern format from Firestore.
 */

export default (_req: Request, res: Response, _next: NextFunction): void => {
  const samples = patternSamples(res.locals.vibration.data.pattern);

  let duty_cycle = DutyCycle(samples[0]);
  let result: number[] = [];

  for (let index = 1; index < samples.length; index++) {
    result = result.concat(dutyCycleToPWM(duty_cycle.current));

    if ((samples[index] == samples[index - 1])) continue;

    if (samples[index] > samples[index - 1]) {
      duty_cycle.current = duty_cycle.next();
    } else {
      duty_cycle.current = duty_cycle.previous();
    }
  };

  res.send(result);
};

const dutyCycleToPWM = (value: number) => {
  if (value == DUTY_CYCLES.STOPPED)
    return [0, 100];
  if (value == DUTY_CYCLES.LOWER)
    return [25, 75];
  if (value == DUTY_CYCLES.MIDDLE_1)
    return [50, 50];
  if (value == DUTY_CYCLES.MIDDLE_2)
    return [75, 25];

  // (value == DUTY_CYCLES.HIGHER)
  return [100, 0];
};

/**
 * Create 4 posible values. Values are in range 0..200.
 */
// const quantify = (value: number) => Math.floor(value / 50);

// const toBinary = (value: number) => value.toString(2);
