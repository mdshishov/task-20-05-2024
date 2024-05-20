import * as _ from '@hexlet/immutable-fs-trees';

const tree = _.mkdir('nodejs-package', [
  _.mkfile('Makefile'),
  _.mkfile('README.md'),
  _.mkdir('dist', []),
  _.mkdir('__tests__', [
    _.mkfile('half.test.js', { type: 'text/javascript' }),
  ]),
  _.mkfile('babel.config.js', { type: 'text/javascript' }),
  _.mkdir('node_modules', [
    _.mkdir('@babel', [
      _.mkdir('cli', [
        _.mkfile('LICENCE'),
      ])
    ]),
  ], { owner: '@root', hidden: false }),
], { hidden: true });

console.log(tree);
