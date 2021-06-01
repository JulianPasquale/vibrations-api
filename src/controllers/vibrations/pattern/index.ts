/**
 * Module dependencies.
 */

import { Request, Response, NextFunction } from 'express';
import patternSamples from './samples';
import DutyCycle, { DUTY_CYCLES } from './duty_cycle';

/**
 * Get vibrations details in pattern format from Firestore.
 */
export default (_req: Request, res: Response, _next: NextFunction): void => {
  const samples = patternSamples(res.locals.vibration.data.pattern);

  const period = res.locals.vibration.data.duration * 1000 / samples.length

  const duty_cycle = DutyCycle(samples[0]);
  let result: number[] = [];

  for (let index = 1; index < samples.length; index++) {
    result = result.concat(dutyCycleToPWM(duty_cycle.current, period));

    if ((samples[index] == samples[index - 1])) continue;

    if (samples[index] > samples[index - 1]) {
      duty_cycle.current = duty_cycle.next();
    } else {
      duty_cycle.current = duty_cycle.previous();
    }
  };

  res.send(result);
};

const dutyCycleToPWM = (value: number, period: number) => {
  if (value == DUTY_CYCLES.STOPPED)
    return [0, period];
  if (value == DUTY_CYCLES.LOWER)
    return [period * 0.25, period * 0.75];
  if (value == DUTY_CYCLES.MIDDLE_1)
    return [period * 0.5, period * 0.5];
  if (value == DUTY_CYCLES.MIDDLE_2)
    return [period * 0.75, period * 0.25];

  // (value == DUTY_CYCLES.HIGHER)
  return [period, 0];
};
