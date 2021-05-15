import DutyCycle, { DUTY_CYCLES } from '../../../src/controllers/vibrations/pattern/duty_cycle';

describe('Test DutyCycle', () => {
  it('should assign correct initial value', () => {
    let duty_cycle = DutyCycle(0);
    expect(duty_cycle.current).toEqual(DUTY_CYCLES.STOPPED);

    duty_cycle = DutyCycle(1);
    expect(duty_cycle.current).toEqual(DUTY_CYCLES.LOWER);

    duty_cycle = DutyCycle(50);
    expect(duty_cycle.current).toEqual(DUTY_CYCLES.LOWER);

    duty_cycle = DutyCycle(51);
    expect(duty_cycle.current).toEqual(DUTY_CYCLES.MIDDLE_1);

    duty_cycle = DutyCycle(100);
    expect(duty_cycle.current).toEqual(DUTY_CYCLES.MIDDLE_1);

    duty_cycle = DutyCycle(101);
    expect(duty_cycle.current).toEqual(DUTY_CYCLES.MIDDLE_2);

    duty_cycle = DutyCycle(150);
    expect(duty_cycle.current).toEqual(DUTY_CYCLES.MIDDLE_2);

    duty_cycle = DutyCycle(151);
    expect(duty_cycle.current).toEqual(DUTY_CYCLES.HIGHER);

    duty_cycle = DutyCycle(200);
    expect(duty_cycle.current).toEqual(DUTY_CYCLES.HIGHER);
  });

  it('should return next value correctly', () => {
    let duty_cycle = DutyCycle(0);
    expect(duty_cycle.next()).toEqual(DUTY_CYCLES.LOWER);

    duty_cycle = DutyCycle(50);
    expect(duty_cycle.next()).toEqual(DUTY_CYCLES.MIDDLE_1);

    duty_cycle = DutyCycle(100);
    expect(duty_cycle.next()).toEqual(DUTY_CYCLES.MIDDLE_2);

    duty_cycle = DutyCycle(150);
    expect(duty_cycle.next()).toEqual(DUTY_CYCLES.HIGHER);

    duty_cycle = DutyCycle(200);
    expect(duty_cycle.next()).toEqual(DUTY_CYCLES.HIGHER);
  });

  it('should return previous value correctly', () => {
    let duty_cycle = DutyCycle(0);
    expect(duty_cycle.previous()).toEqual(DUTY_CYCLES.STOPPED);

    duty_cycle = DutyCycle(50);
    expect(duty_cycle.previous()).toEqual(DUTY_CYCLES.STOPPED);

    duty_cycle = DutyCycle(100);
    expect(duty_cycle.previous()).toEqual(DUTY_CYCLES.LOWER);

    duty_cycle = DutyCycle(150);
    expect(duty_cycle.previous()).toEqual(DUTY_CYCLES.MIDDLE_1);

    duty_cycle = DutyCycle(200);
    expect(duty_cycle.previous()).toEqual(DUTY_CYCLES.MIDDLE_2);
  });

  it('should match enum values', () => {
    expect(DUTY_CYCLES.STOPPED).toEqual(0);
    expect(DUTY_CYCLES.LOWER).toEqual(0.25);
    expect(DUTY_CYCLES.MIDDLE_1).toEqual(0.5);
    expect(DUTY_CYCLES.MIDDLE_2).toEqual(0.75);
    expect(DUTY_CYCLES.HIGHER).toEqual(1);
  });
});
