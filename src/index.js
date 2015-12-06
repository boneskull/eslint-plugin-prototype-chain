'use strict';

// map of scopes to data
const scopes = new WeakMap();

/**
 * Attempts to find all MemberExpressions up to an ObjectExpression or
 * ThisExpression in a node.  Finds "foo.bar.baz" or "this.bar.baz".
 * @param node
 * @returns {string[]}
 */
function getIdentifiers(node) {
  let object = node.object;
  // this is the "baz"
  const identifiers = [node.property.name];
  // these are everything up to the first object ("foo") or "this", exclusive
  while (object && object.type === 'MemberExpression') {
    identifiers.push(object.property.name);
    object = object.object;
  }
  // this is the object name or "this"
  if (object.type === 'Identifier') {
    identifiers.push(object.name);
  } else if (object.type === 'ThisExpression') {
    identifiers.push('this');
  }
  // it will be backwards, so reverse it.
  return identifiers.reverse();
}

function prototypeChain(context) {
  // max number of uses of the same lookup to tolerate within a scope
  const max = context.options[0] || 1;
  // max depth to worry about; 3 implies "foo.bar" can be repeated but not
  // "foo.bar.baz"
  const depth = context.options[1] || 2;

  return {
    MemberExpression(node) {
      if (!node.computed) {
        const identifiers = getIdentifiers(node);
        if (identifiers.length >= depth) {
          const scope = context.getScope();
          const data = scopes.get(scope) || {
            reported: new Set(),
            counts: new Map()
          };
          const counts = data.counts;
          const reported = data.reported;
          const id = identifiers.join('.');
          let count = counts.get(id) || 0;
          counts.set(id, ++count);
          if (!reported.has(id) && count > max) {
            let reportedIdentifiers = id.split('.');
            while (reportedIdentifiers.length >= depth) {
              reported.add(reportedIdentifiers.join('.'));
              reportedIdentifiers.pop();
            }
            const message = `${id} used ${count} times(s) in the same scope; define a variable instead`;
            context.report(node, message);
          }
          scopes.set(scope, data);
        }
      }
    }
  };
}

prototypeChain.schema = [
  {
    type: 'integer'
  },
  {
    type: 'integer'
  }
];

module.exports = prototypeChain;
