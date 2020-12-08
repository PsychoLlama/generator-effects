import runtime from '../../runtime';
import createContext from '../context';
import { define } from '../../dispatcher';
import Future from '../../future';
import * as task from '../../effects/task';

describe('Context', () => {
  const context = createContext('default value');
  const getContext = define((lookup) => {
    return Future.resolve(lookup(context));
  });

  describe('.override', () => {
    it('yields execution to the nested generator', async () => {
      await runtime(function* () {
        const result = yield context.override(5, function* () {
          return 'hi!';
        });

        expect(result).toBe('hi!');
      });
    });

    it('creates a new sub-context', async () => {
      await runtime(function* () {
        expect(yield getContext()).toBe('default value');

        yield context.override('new value', function* () {
          expect(yield getContext()).toBe('new value');
        });

        expect(yield getContext()).toBe('default value');
      });
    });

    it('allows task joins on context overrides', async () => {
      await runtime(function* () {
        yield task.join([
          task.join([]),
          context.override('new value', function* () {}),
        ]);
      });
    });
  });
});
