import { defer, run, define } from '../dispatcher';
import Future from '../future';

describe('Runner', () => {
  it('creates and executes IO handles', () => {
    const done = jest.fn();
    const handle = defer(() => Future.resolve('result'));
    run(handle).map(done);

    expect(done).toHaveBeenCalledWith('result');
  });

  it('returns a failed future if the handle is invalid', () => {
    run('invalid handle').map(null, (error) => {
      expect(error.message).toMatch(/not an effect/);
    });
  });

  it('exposes a function for defining new effects', () => {
    const handler = jest.fn();
    const wrapper = define(() => Future.resolve('result'));
    run(wrapper()).map(handler);

    expect(handler).toHaveBeenCalledWith('result');
  });
});
