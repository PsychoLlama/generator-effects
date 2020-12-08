class Context {}

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
