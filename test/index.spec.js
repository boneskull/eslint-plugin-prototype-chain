'use strict';

const rule = require('../src/');
const RuleTester = require('eslint/lib/testers/rule-tester');

const ruleTester = new RuleTester();
ruleTester.run('prototype-chain', rule, {
  valid: [
    {
      code: 'this.foo',
      options: [1]
    },
    {
      code: 'bar.baz.quux',
      options: [1]
    },
    {
      code: 'bar.baz && bar.baz',
      options: [1, 3]
    },
    {
      code: 'bar.baz && bar.baz',
      options: [2]
    }
  ],
  invalid: [
    {
      code: 'this.foo && this.foo',
      options: [1],
      errors: [
        {
          message: 'this.foo used 2 times(s) in the same scope; define a variable instead',
          type: 'MemberExpression'
        }
      ]
    },
    {
      code: 'bar.baz && bar.baz',
      options: [1],
      errors: [
        {
          message: 'bar.baz used 2 times(s) in the same scope; define a variable instead',
          type: 'MemberExpression'
        }
      ]
    },
    {
      code: 'bar.baz.quux && bar.baz',
      options: [1],
      errors: [
        {
          message: 'bar.baz used 2 times(s) in the same scope; define a variable instead',
          type: 'MemberExpression'
        }
      ]
    },
    {
      code: 'bar.baz.quux && bar.baz.quux',
      options: [1, 2],
      errors: [
        {
          message: 'bar.baz.quux used 2 times(s) in the same scope; define a variable instead',
          type: 'MemberExpression'
        }
      ]
    },
    {
      code: 'bar.baz.quux && bar.baz.quux',
      options: [1, 3],
      errors: [
        {
          message: 'bar.baz.quux used 2 times(s) in the same scope; define a variable instead',
          type: 'MemberExpression'
        }
      ]
    }
  ]
});
