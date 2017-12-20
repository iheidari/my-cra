import reducer from './index';

describe('reducers', () => {
  describe('counter', () => {
    it('should ignore unknown actions', () => {
      expect(reducer(1, { type: 'unknown' })).toBe(1);
    });
  });
});
