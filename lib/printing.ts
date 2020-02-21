import { AstNode } from './ast';
import chalk = require('chalk');

export function printAstNode(root: AstNode, stream: NodeJS.WritableStream) {
  recurse(root, '');
  stream.write('\n');

  function recurse(node: AstNode, indent: string) {
    stream.write(`${node.definition.name}`);
    for (const [[slotName, value], last] of withLast(Object.entries(node.values))) {
      const thisNodeBranch = last ? '└─' : '├─';
      const chldNodeBranch = last ? '  ' : '│ ';

      stream.write(`\n${indent} ${thisNodeBranch} ${chalk.underline(slotName)}:`);
      if (node.definition.isNodeSlot(slotName)) {
        const deeperIndent = `${indent} ${chldNodeBranch}     `;
        stream.write(`\n${deeperIndent}`);
        assertIsAstNode(value);
        recurse(value, deeperIndent);
      } else if (node.definition.isNodeArraySlot(slotName)) {
        assertIsAstNodeArray(value);
        for (const [element, lastEl] of withLast(value)) {
          const elBranch = lastEl ? '└─' : '├─';
          const sbBranch = lastEl ? '  ' : '│ ';
          stream.write  (`\n${indent}     ${elBranch} `);
          recurse(element, `${indent}     ${sbBranch} `);
        }
      } else {
        stream.write(` ${value}`);
      }
    }
  }
}

function assertIsAstNode(node: any): asserts node is AstNode {
  if (!(typeof node === 'object' && node !== null && node instanceof AstNode)) {
    throw new Error(`Expected AstNode: ${node}`);
  }
}

function assertIsAstNodeArray(node: any): asserts node is AstNode[] {
  if (!Array.isArray(node)) {
    throw new Error(`Expected array: ${node}`);
  }
  node.forEach(assertIsAstNode);
}

function withLast<A>(xs: Array<A>): Array<[A, boolean]> {
  const ret: Array<[A, boolean]> = [];
  for (const x of xs) {
    ret.push([x, false]);
  }
  if (ret.length > 0) {
    ret[ret.length - 1][1] = true;
  }
  return ret;
}