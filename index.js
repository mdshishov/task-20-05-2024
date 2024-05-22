import * as t from '@hexlet/immutable-fs-trees';
import _ from 'lodash';

const tree = t.mkdir('nodejs-package', [
  t.mkfile('Makefile'),
  t.mkfile('README.md'),
  t.mkdir('dist', []),
  t.mkdir('__tests__', [
    t.mkfile('half.test.js', { type: 'text/javascript' }),
  ]),
  t.mkfile('babel.config.js', { type: 'text/javascript' }),
  t.mkdir('node_modules', [
    t.mkdir('@babel', [
      t.mkdir('cli', [
        t.mkfile('LICENCE'),
      ])
    ]),
  ], { owner: '@root', hidden: false }),
], { hidden: true });

const printTree = (tree) => {
  console.log(t.getName(tree));

  if (t.isFile(tree)) {
    return;
  }

  t.getChildren(tree).forEach((child) => printTree(child));
};

const changeMeta = (tree, param, value) => {
  const name = t.getName(tree);
  const newMeta = _.cloneDeep(t.getMeta(tree));
  newMeta[param] = value;

  if (t.isFile(tree)) {
    return t.mkfile(name, newMeta);
  }

  const children = t.getChildren(tree).map((child) => (changeMeta(child, param, value)));
  return t.mkdir(name, children, newMeta);
};

const printTreeWithParam = (tree, param) => {
  const name = t.getName(tree);
  const value = t.getMeta(tree)[param];
  console.log(`${name}, ${param}: ${value}`);

  if (t.isFile(tree)) {
    return;
  }

  t.getChildren(tree).forEach((child) => printTreeWithParam(child, param));
};

const countAll = (tree) => {
  if (t.isFile(tree)) {
    return 1;
  }
  return 1 + _.sum(t.getChildren(tree).map((child) => countAll(child)));
};

const countFiles = (tree) => {
  if (t.isFile(tree)) {
    return 1;
  }
  return _.sum(t.getChildren(tree).map((child) => countFiles(child)));
};

const countDirectories = (tree) => {
  if (t.isFile(tree)) {
    return 0;
  }
  return 1 + _.sum(t.getChildren(tree).map((child) => countDirectories(child)));
};

const countFilesInDirectory = (tree) => {
  if (t.isDirectory(tree)) {
    const name = t.getName(tree);
    const childrenCount = t.getChildren(tree)
      .filter((child) => t.isFile(child))
      .length;
    console.log(`${name}: ${childrenCount}`);
    t.getChildren(tree).forEach((child) => {countFilesInDirectory(child)});
  }
};

console.log(tree);
printTree(tree);

const newTree = changeMeta(tree, 'owner', 'me');
console.log(newTree);
printTreeWithParam(tree, 'owner');
printTreeWithParam(newTree, 'owner');
console.log(countAll(tree));
console.log(countFiles(tree));
console.log(countDirectories(tree));

countFilesInDirectory(tree);

