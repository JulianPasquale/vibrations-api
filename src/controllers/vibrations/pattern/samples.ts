/**
 * Module dependencies.
*/

import { VibrationPattern } from '../index.d';

/**
 * Fixed sampling count per point.
*/
const SAMPLING_COUNT = 10;

export default (pattern: VibrationPattern[]) => {
  /** 
   * Get only the numbers from the pattern.
  */
  const numbers = pattern.map(elem => elem.value);

  let elems: number[] = [];

  for (let index = 0; index < numbers.length - 1; index++) {
    const current = numbers[index];
    const next = numbers[index + 1];

    /** 
     * Process and concat all the samples for each point (current)
     * depending next point (next).
    */
    elems = elems.concat(samplesForIndex(current, next));
  };

  /** 
   * Push the final point value. It has no next value, so won't be processed.
  */
  elems.push(numbers[numbers.length - 1]);

  return elems;
};

/** 
 * Process point depending if next value is equal, bigger or smaller.
*/
const samplesForIndex = (current: number, next: number): number[] => {
  if (next == current) {
    return new Array(SAMPLING_COUNT).fill(current);
  } else if (next > current) {
    return processSample(current, next - current, increase);
  } else {
    return processSample(current, current - next, decrease);
  };
};

/** 
 * Get samples for an individual point.
*/
const processSample = (
  current: number,
  difference: number,
  operation: (a: number, b: number) => number,
) => {
  const result: number[] = [];
  const samplingSize = difference / SAMPLING_COUNT;
  let prevAux = current;

  for (let index = 0; index < SAMPLING_COUNT; index++) {
    result.push(prevAux);
    prevAux = operation(prevAux, samplingSize);
  };

  return result;
};

/** 
 * Will use this function if next sample is greater than current.
*/
const increase = (a: number, b: number) => a + b;

/** 
 * Will use this function if next sample is smaller than current.
*/
const decrease = (a: number, b: number) => a - b;
