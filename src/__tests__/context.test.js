import * as context from '../context';

describe('Context', () => {
  it('can store and retrieve values', () => {
    const ctx = context.define();
    const chain = context.create().branch(ctx, 'value');

    expect(chain.lookup(ctx)).toMatchObject({
      exists: true,
      value: 'value',
    });
  });

  it('returns the right context', () => {
    const ctx1 = context.define();
    const ctx2 = context.define();
    const ctx3 = context.define();

    const chain = context
      .create()
      .branch(ctx1, 'first')
      .branch(ctx2, 'second')
      .branch(ctx3, 'third');

    expect(chain.lookup(ctx2)).toMatchObject({
      exists: true,
      value: 'second',
    });
  });

  it('indicates if the value was not found', () => {
    const ctx1 = context.define();
    const ctx2 = context.define();
    const chain = context.create().branch(ctx1, 'value');

    expect(chain.lookup(ctx2)).toMatchObject({
      exists: false,
      value: null,
    });
  });
});
