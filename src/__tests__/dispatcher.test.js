import { run, define } from '../dispatcher';
import Future from '../future';
import createScope from '../context/scope';

describe('Runner', () => {
  it('creates and executes IO handles', () => {
    const done = jest.fn();
    const wrapper = define(() => Future.resolve('result'));
    const scope = createScope();
    run(wrapper(), scope).map(done);

    expect(done).toHaveBeenCalledWith('result');
  });

  it('returns a failed future if the handle is invalid', () => {
    run('invalid handle').map(null, (error) => {
      expect(error.message).toMatch(/not an effect/);
    });
  });

  it('exposes a function for defining new effects', () => {
    const handler = jest.fn();
    const scope = createScope();
    const wrapper = define(() => Future.resolve('result'));
    run(wrapper(), scope).map(handler);

    expect(handler).toHaveBeenCalledWith('result');
  });

  it('passes the context scope', () => {
    const effect = jest.fn(() => Future.resolve());
    const scope = createScope();
    const wrapper = define(effect);

    run(wrapper(), scope);

    expect(effect).toHaveBeenCalledWith(scope.lookup);
  });
});
