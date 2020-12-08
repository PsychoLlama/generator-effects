import * as timer from '../timer';
import { run } from '../../dispatcher';
import createScope from '../../context/scope';

jest.useFakeTimers('modern');

describe('Timer effects', () => {
  describe('sleep', () => {
    it('sleeps for the given millisecond duration', () => {
      const handler = jest.fn();
      run(timer.sleep(1000), createScope()).map(handler);

      expect(handler).not.toHaveBeenCalled();
      jest.runOnlyPendingTimers();
      expect(handler).toHaveBeenCalled();
    });
  });
});
