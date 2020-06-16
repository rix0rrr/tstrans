tstrans
=======

A completely half-baked attempt at an AST rewriter for TypeScript.

The goal is to rewrite the AST using a set of rewriting rules, thereby
transforming TypeScript into other languages in a declarative way.

Current Status
---------------

Can currently parse TypeScript into an abstraction of its AST.

Stuck at finding a good way to formulate rewrite rules.

See it in action
----------------

```
npm install
npm run demo
```

Small Oopsie
------------

We're going to need a way to deal with the AST and the CST concurrently...
