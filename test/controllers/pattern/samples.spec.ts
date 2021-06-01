import samples from '../../../src/controllers/vibrations/pattern/samples';
import { VibrationPattern } from '../../../src/controllers/vibrations/index.d';

describe('Test sampling process', () => {
  test('should match expected sample constant pattern', () => {
    const pattern: VibrationPattern[] = [
      { name: 1, value: 10 },
      { name: 2, value: 10 },
    ];

    const expected_samples = Array(11).fill(10);

    const result = samples(pattern);
    expect(result).toEqual(expected_samples);
    expect(result).toHaveLength(11);
  });

  test('should match expected sample for increasing values', () => {
    const pattern: VibrationPattern[] = [
      { name: 1, value: 10 },
      { name: 2, value: 20 },
    ];

    const expected_samples = [];
    for (let index = 0; index < 11; index++) {
      expected_samples.push(10 + index);
    };

    const result = samples(pattern);
    expect(result).toEqual(expected_samples);
    expect(result).toHaveLength(11);
  });

  test('should match expected sample for decreasing values', () => {
    const pattern: VibrationPattern[] = [
      { name: 1, value: 20 },
      { name: 2, value: 10 },
    ];

    const expected_samples = [];
    for (let index = 0; index < 11; index++) {
      expected_samples.push(20 - index);
    };

    const result = samples(pattern);
    expect(result).toEqual(expected_samples);
    expect(result).toHaveLength(11);
  });

  test('should match expected sample with all kind of values', () => {
    const pattern: VibrationPattern[] = [
      { name: 1, value: 20 },
      { name: 2, value: 10 },
      { name: 3, value: 20 },
      { name: 4, value: 20 },
      { name: 5, value: 40 },
    ];

    let expected_samples = [];
    // 20..10
    for (let index = 0; index < 11; index++) {
      expected_samples.push(20 - index);
    };
    // 10..20
    for (let index = 1; index < 11; index++) {
      expected_samples.push(10 + index);
    };
    // 20..20
    expected_samples = expected_samples.concat(Array(10).fill(20));
    // 20..40
    for (let index = 1; index < 11; index++) {
      expected_samples.push(20 + index * 2);
    };

    const result = samples(pattern);
    expect(result).toEqual(expected_samples);
    expect(result).toHaveLength(41);
  });
});
