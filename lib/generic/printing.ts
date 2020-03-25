import { AstNode } from './node';
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
        assertIsAstNode(value);
        stream.write(`\n${indent} ${chldNodeBranch}  ⊙ `);
        recurse(value, `${indent} ${chldNodeBranch}    `);
      } else if (node.definition.isNodeArraySlot(slotName)) {
        assertIsAstNodeArray(value);
        if (value.length === 0) {
          stream.write(' []');
        }
        for (const [element, lastEl] of withLast(value)) {
          const elBranch = lastEl ? '└─' : '├─';
          const sbBranch = lastEl ? '  ' : '│ ';
          stream.write  (`\n${indent} ${chldNodeBranch}  ${elBranch} `);
          recurse(element, `${indent} ${chldNodeBranch}  ${sbBranch} `);
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