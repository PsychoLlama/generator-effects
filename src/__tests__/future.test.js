import Future from '../future';

describe('Future', () => {
  it('exposes success values', () => {
    const handler = jest.fn();
    Future((f) => f.resolve('result')).map(handler, jest.fn());

    expect(handler).toHaveBeenCalledWith('result');
  });

  it('exposes rejected values', () => {
    const handler = jest.fn();
    Future((f) => f.reject('failure')).map(jest.fn(), handler);

    expect(handler).toHaveBeenCalledWith('failure');
  });

  it('only emits success or failure, never both', () => {
    const yey = jest.fn();
    const ney = jest.fn();
    Future((f) => {
      f.resolve('woot');
      f.reject('oh noes');
    }).map(yey, ney);

    expect(yey).toHaveBeenCalledWith('woot');
    expect(ney).not.toHaveBeenCalled();
  });

  it('allows asynchronous subscribers', async () => {
    const promise = Promise.resolve(5);
    const yey = jest.fn();
    const ney = jest.fn();
    Future((f) => promise.then(f.resolve, f.reject)).map(yey, ney);

    await promise;

    expect(yey).toHaveBeenCalledWith(5);
    expect(ney).not.toHaveBeenCalled();
  });

  it('maps to another future', () => {
    const handler = jest.fn();
    Future((f) => f.resolve('10'))
      .map(Number)
      .map(handler);

    expect(handler).toHaveBeenCalledWith(10);
  });

  it('allows listeners to be omitted', () => {
    const handler = jest.fn();
    Future((f) => f.reject('x'))
      .map(Number)
      .map(null, handler);

    expect(handler).toHaveBeenCalledWith('x');
  });

  describe('.resolve', () => {
    it('returns a resolved future', () => {
      const handler = jest.fn();
      Future.resolve(50).map(handler);

      expect(handler).toHaveBeenCalledWith(50);
    });
  });

  describe('.reject', () => {
    it('returns a rejected future', () => {
      const handler = jest.fn();
      Future.reject(20).map(null, handler);

      expect(handler).toHaveBeenCalledWith(20);
    });
  });
});
