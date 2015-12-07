# eslint-prototype-chain

> ESLint rule to optimize prototype chain lookups

## Summary

Repeatedly looking up values deep in the prototype chain can be less-than-performant--especially if [getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) are defined.  Creating a variable to reference the value can speed things up.

This [ESLint](http://eslint.org) rule will tell you if you're doing this too much.

## Installation

```shell
$ npm install -D eslint eslint-plugin-prototype-chain
```

## Usage

Add this to your `.eslintrc`, assuming it's a JSON file:

```json
{
  "plugins": [
    "prototype-chain"
  ],
  "prototype-chain": [2, 1, 1]
}
```

The above configuration will cause an ESLint error when, *in the same scope*:

- You use the same object member expression (`foo.bar`) OR the same "this" expression (`this.bar`) more than one (1) time (that's the 2nd array item), AND
- You use one (1) member in the chain

A configuration such as this:

```json
{
  "prototype-chain": [2, 2, 3]
}
```

would cause an ESLint error when, *in the same scope*:

- You use the same object member expression (`foo.bar`) OR the same "this" expression (`this.bar`) more than one (2) times, AND
- You use one (2) members in the chain

That means repeating `foo.bar` will *not* throw an error.  Repeating `foo.bar.baz` one time will not cause an error, but repeating it two times will.
 
Hope that makes sense!

## Fair Warning

There are tests, but I haven't tried this against much real-world code yet.

## License

© 2015 [Christopher Hiller](https://boneskull.com).  Licensed MIT.

