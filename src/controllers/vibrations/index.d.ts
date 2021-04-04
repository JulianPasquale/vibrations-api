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
  name: string,
  category: string,
};
