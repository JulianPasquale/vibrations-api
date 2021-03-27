/**
 * Module dependencies.
 */

import { Request, Response, NextFunction } from 'express';
import { VibrationPattern } from '..';

const SAMPLING_COUNT = 10;

/**
 * Get vibrations details in pattern format from Firestore.
 */

export default (_req: Request, res: Response, _next: NextFunction): void => {
  debugger;
  res.send(samples(res.locals.vibration.data.pattern));
};

const samples = (pattern: VibrationPattern[]) => {
  const numbers = pattern.map(elem => elem.value);
  let elems: number[] = [];

  for (let index = 0; index < numbers.length - 1; index++) {
    const prev = numbers[index];
    const current = numbers[index + 1];

    console.log(prev);
    console.log(current);

    elems = elems.concat(samplesForIndex(prev, current));
  };

  elems.push(numbers[numbers.length - 1]);

  return elems;
};

const samplesForIndex = (prev: number, current: number): number[] => {
  if (prev == current) {
    return new Array(SAMPLING_COUNT).fill(prev);
  } else if (current > prev) {
    return processSample(prev, current - prev, increase);
  } else {
    return processSample(prev, prev - current, decrease);
  };
};

const processSample = (prev: number, difference: number, operation: (a: number, b: number) => number) => {
  const result: number[] = [];
  const samplingSize = difference / SAMPLING_COUNT;
  let prevAux = prev;

  for (let index = 0; index < SAMPLING_COUNT; index++) {
    result.push(prevAux);
    prevAux = operation(prevAux, samplingSize);
  };

  return result;
}

const increase = (a: number, b: number) => a + b;
const decrease = (a: number, b: number) => a - b;