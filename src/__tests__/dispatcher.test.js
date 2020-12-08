import { defer, run } from '../dispatcher';

describe('Runner', () => {
  it('creates and executes IO handles', () => {
    const handle = defer(() => 'result');

    expect(run(handle)).toBe('result');
  });

  it('returns a failed future if the handle is invalid', () => {
    run('invalid handle').map(null, (error) => {
      expect(error.message).toMatch(/not an effect/);
    });
  });
});
