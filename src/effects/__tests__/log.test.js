import * as log from '../log';
import { run } from '../../dispatcher';
import createScope from '../../context/scope';

describe('Log effects', () => {
  jest.spyOn(console, 'log').mockReturnValue();
  jest.spyOn(console, 'error').mockReturnValue();

  describe('.print', () => {
    it('prints to stdout', () => {
      run(log.print('msg'), createScope());

      expect(console.log).toHaveBeenCalledWith('msg');
    });
  });

  describe('.print', () => {
    it('prints to stderr', () => {
      run(log.error('oh noes'), createScope());

      expect(console.error).toHaveBeenCalledWith('oh noes');
    });
  });
});
