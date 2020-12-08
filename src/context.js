export function define() {
  return Symbol('runtime:context');
}

/**
 * Returns a new context chain. Contexts store and retrieve hierarchical
 * configuration. You can only access parent contexts.
 */
export function create() {
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
    // Parent node. Nothing to find.
    if (!node) {
      return {
        exists: false,
        value: null,
      };
    }

    if (node.context === ctx) {
      return {
        exists: true,
        value: node.value,
      };
    }

    return lookup(node.parent, ctx);
  }

  return createDescendant(null);
}
