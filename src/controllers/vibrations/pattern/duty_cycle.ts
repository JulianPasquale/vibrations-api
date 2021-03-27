export enum DUTY_CYCLES {
  'STOPPED' = 0,
  'LOWER' = 0.25,
  'MIDDLE_1' = 0.5,
  'MIDDLE_2' = 0.75,
  'HIGHER' = 1,
};

const initialDutyCycle = (value: number) => {
  if (value == 0) return DUTY_CYCLES.STOPPED;
  if (value > 0 && value <= 50) return DUTY_CYCLES.LOWER;
  if (value > 50 && value <= 100) return DUTY_CYCLES.MIDDLE_1;
  if (value > 100 && value <= 150) return DUTY_CYCLES.MIDDLE_2;

  return DUTY_CYCLES.HIGHER;
};

export default (initialValue: number) => {
  let current = initialDutyCycle(initialValue);

  const next = () => {
    if (current == DUTY_CYCLES.STOPPED)
      return DUTY_CYCLES.LOWER;
    else if (current == DUTY_CYCLES.LOWER)
      return DUTY_CYCLES.MIDDLE_1;
    else if (current == DUTY_CYCLES.MIDDLE_1)
      return DUTY_CYCLES.MIDDLE_2;
    else if (current == DUTY_CYCLES.MIDDLE_2)
      return DUTY_CYCLES.HIGHER;
    else // if (current == DUTY_CYCLES.HIGHER)
      return DUTY_CYCLES.HIGHER;
  };

  const previous = () => {
    if (current == DUTY_CYCLES.STOPPED)
      return DUTY_CYCLES.STOPPED;
    else if (current == DUTY_CYCLES.LOWER)
      return DUTY_CYCLES.STOPPED;
    else if (current == DUTY_CYCLES.MIDDLE_1)
      return DUTY_CYCLES.LOWER;
    else if (current == DUTY_CYCLES.MIDDLE_2)
      return DUTY_CYCLES.MIDDLE_1;
    else // if (current == DUTY_CYCLES.HIGHER)
      return DUTY_CYCLES.MIDDLE_2;
  };

  return { next, previous, current };
};
