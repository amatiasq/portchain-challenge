import { describe, expect, it } from '@jest/globals';
import { getPercentil } from './getPercentil';

describe('getPercentil function', () => {
  it('should retrieve the correct value for given percentile', () => {
    const list = [1, 2, 3, 4, 5];
    expect(getPercentil(list, 50)).toBe(3);
  });

  it('should handle empty list', () => {
    const list: number[] = [];
    expect(getPercentil(list, 50)).toBeUndefined();
  });

  it('should return the first item for 0 percentile', () => {
    const list = [1, 2, 3, 4, 5];
    expect(getPercentil(list, 0)).toBe(1);
  });

  it('should return the last item for 100 percentile', () => {
    const list = [1, 2, 3, 4, 5];
    expect(getPercentil(list, 100)).toBe(5);
  });

  // Boundary Cases
  it('should work correctly for non-integer indices', () => {
    const list = [1, 2, 3, 4, 5, 6];
    expect(getPercentil(list, 50)).toBe(3);
  });
});
