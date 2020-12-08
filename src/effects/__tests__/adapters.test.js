import * as intoEffect from '../adapters';
import runtime from '../../runtime';

describe('Effect adapters', () => {
  describe('usingCallback', () => {
    it('wraps the API in an effect', async () => {
      const api = jest.fn((a, b, c, d, callback) => {
        callback(null, 'results');
      });

      const effect = intoEffect.usingCallback(api);

      await runtime(function* () {
        expect(yield effect(1, 2, 3, 4)).toBe('results');
      });
    });

    it('detects and reports errors', async () => {
      const error = new Error('Testing callback errors');
      const api = jest.fn((a, b, c, d, callback) => {
        callback(error);
      });

      const effect = intoEffect.usingCallback(api);

      const promise = runtime(function* () {
        expect(yield effect(1, 2, 3, 4)).toBe('results');
      });

      await expect(promise).rejects.toBe(error);
    });
  });
});
