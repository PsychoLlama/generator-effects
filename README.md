<div align="center">
  <h1>Generator Effects</h1>
  <p>A proof-of-concept effect interpreter for generator functions.</p>
</div>

## Purpose
The idea of pairing generator functions with an interpreter has eaten at my psyche for years. This "library" is an attempt to see just how far you can take it, and with luck, purge my nagging curiosity.

I put "library" in quotes because it's not a real library and it will never be published. The only value this codebase can offer is demonstrating just how much is possible with generators. Spoilers: much. Check out [the examples folder](https://github.com/PsychoLlama/effect-runtime/tree/master/examples).

## Gist
The experiment was a thrilling success. Here's what's implemented:

- Deeply linked Algebraic Effects resume execution through `yield` statements.
- Context trees allow isolated state sharing with entire branches of the call stack (think React hooks).
- Async effects that read as though they're blocking (this is how async/await is implemented, after all).
- Effect composition - all effects can be programmatically manipulated as data structures (just like promises).

## Possibilities
There are some capabilities that I didn't explore, but realized they were possible.

- Nearly any API can be expressed as a generator effect, including data streams, mutable objects APIs, and concurrent process management.
- Since every effect travels through the interpreter, every effect can be logged, ignored, composed, or replaced.
- Purely functional dependency injection is possible through context trees, and is even easily integrated into the interpreter.

In JavaScript it's rare to see generators used outside of iteration, but they're capable of much more.

See [the examples](https://github.com/PsychoLlama/effect-runtime/tree/master/examples) for more details.
