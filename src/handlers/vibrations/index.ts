export { default as detailsHandler } from './details';
export { default as listHandler } from './list';
export { default as createHandler } from './create';
export { default as patternHandler } from './pattern';
export { default as deleteHandler } from './delete';

export interface VibrationPattern {
  name: number,
  value: number,
};

export interface VibrationData {
  duration: number,
  pattern: VibrationPattern[],
};

export interface APIResponse {
  id: string,
  data: FirebaseFirestore.DocumentData | VibrationData,
};
