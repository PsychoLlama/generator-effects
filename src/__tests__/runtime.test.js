import runtime from '../runtime';
import { defer } from '../runner';
import Future from '../future';

describe('Runtime', () => {
  it('executes effects', async () => {
    const handler = jest.fn(() => Future.resolve());

    await runtime(function* () {
      yield defer(handler);
    });

    expect(handler).toHaveBeenCalled();
  });

  it('resolves with the generator return value', async () => {
    const result = await runtime(function* () {
      return 'result';
    });

    expect(result).toBe('result');
  });

  it('returns the effect value through yield', async () => {
    await runtime(function* () {
      const result = yield defer(() => Future.resolve('result'));

      expect(result).toBe('result');
    });
  });

  it('rejects the runtime promise on uncaught effect failures', async () => {
    const error = new Error('testing effect failures');
    const promise = runtime(function* () {
      yield defer(() => Future.reject(error));
    });

    await expect(promise).rejects.toThrow(error);
  });

  it('allows generators a chance to catch the effect error', async () => {
    await runtime(function* () {
      const error = new Error('testing caught effect errors');
      try {
        yield defer(() => Future.reject(error));
      } catch (failure) {
        expect(failure).toBe(error);
      }
    });
  });

  it('allows program composition', async () => {
    function* subroutine() {
      const result = yield defer(() => Future.resolve('yielded'));
      expect(result).toBe('yielded');

      return 'returned';
    }

    await runtime(function* () {
      expect(yield* subroutine()).toBe('returned');
    });
  });
});
