import createScope from '../scope';
import createContext from '../context';

describe('createScope', () => {
  it('can store and retrieve values', () => {
    const ctx = createContext();
    const scope = createScope().branch(ctx, 'value');

    expect(scope.lookup(ctx)).toBe('value');
  });

  it('returns the right context', () => {
    const ctx1 = createContext();
    const ctx2 = createContext();
    const ctx3 = createContext();

    const scope = createScope()
      .branch(ctx1, 'first')
      .branch(ctx2, 'second')
      .branch(ctx3, 'third');

    expect(scope.lookup(ctx2)).toBe('second');
  });

  it('returns the default value when not found', () => {
    const ctx1 = createContext();
    const ctx2 = createContext('default value');
    const scope = createScope().branch(ctx1, 'value');

    expect(scope.lookup(ctx2)).toBe('default value');
  });

  it('blows up if you give it an invalid context', () => {
    const scope = createScope();
    const fail = () => scope.lookup({ invalid: true });

    expect(fail).toThrow(/context/);
  });
});
