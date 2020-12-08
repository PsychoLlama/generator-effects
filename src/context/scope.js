import { getDefaultValue } from './context';

/**
 * Returns a new context chain. Contexts store and retrieve hierarchical
 * configuration. You can only access parent contexts.
 */
export default function createScope() {
  function createDescendant(node) {
    return {
      branch(context, value) {
        return createDescendant({
          parent: node,
          context,
          value,
        });
      },
      lookup(ctx) {
        return lookup(node, ctx);
      },
    };
  }

  // Scan upward looking for a context that matches `ctx`.
  function lookup(node, ctx) {
    if (!node) return getDefaultValue(ctx);
    if (node.context === ctx) return node.value;

    return lookup(node.parent, ctx);
  }

  return createDescendant(null);
}
