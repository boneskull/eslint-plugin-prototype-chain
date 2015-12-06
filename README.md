# eslint-prototype-chain

> ESLint rule to optimize prototype chain lookups

## Summary

Repeatedly looking up values deep in the prototype chain can be less-than-performant--especially if [getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) are defined.  Creating a variable to reference the value can speed things up.

This [ESLint](http://eslint.org) rule 
