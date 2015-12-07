'use strict';

module.exports = {
  rules: {
    'prototype-chain': require('./rules/prototype-chain')
  },
  rulesConfig: {
    'prototype-chain': [1, 2]
  }
};
