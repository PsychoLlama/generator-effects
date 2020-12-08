import { defer } from '../dispatcher';
import { consumeIntoFuture } from '../runtime';

class Context {
  constructor() {
    this.override = (value, program) => {
      return defer((scope) => {
        return consumeIntoFuture(program(), scope.branch(this, value));
      });
    };
  }
}

const defaultValues = new WeakMap();

export function getDefaultValue(context) {
  if (!defaultValues.has(context)) {
    throw new Error(`An invalid context was given.`);
  }

  return defaultValues.get(context);
}

export default function createContext(defaultValue) {
  const context = new Context();
  defaultValues.set(context, defaultValue);

  return context;
}
