import * as log from '../log';
import { run } from '../../dispatcher';

describe('Log effects', () => {
  jest.spyOn(console, 'log').mockReturnValue();
  jest.spyOn(console, 'error').mockReturnValue();

  describe('.print', () => {
    it('prints to stdout', () => {
      run(log.print('msg'));

      expect(console.log).toHaveBeenCalledWith('msg');
    });
  });

  describe('.print', () => {
    it('prints to stderr', () => {
      run(log.error('oh noes'));

      expect(console.error).toHaveBeenCalledWith('oh noes');
    });
  });
});
