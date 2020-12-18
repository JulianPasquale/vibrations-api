export { default as detailsHandler } from './details';
export { default as listHandler } from './list';
export { default as createHandler } from './create';
export { default as patternHandler } from './pattern';

export interface VibrationPattern {
  name: number,
  value: number,
};

export interface Vibration {
  duration: number,
  pattern: VibrationPattern[],
};

export interface APIResponse {
  id: string,
  data: FirebaseFirestore.DocumentData,
};

/**
 * Mock values
 */

export const sample1: Vibration = {
  duration: 1,
  pattern: [
    { name: 1, value: 100 },
    { name: 2, value: 100 },
    { name: 3, value: 100 },
    { name: 4, value: 100 },
  ],
};

export const sample2: Vibration = {
  duration: 1,
  pattern: [
    { name: 1, value: 50 },
    { name: 2, value: 50 },
    { name: 3, value: 200 },
    { name: 4, value: 50 },
    { name: 5, value: 50 },
  ],
};
