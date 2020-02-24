import * as ts from 'typescript';
import 'source-map-support/register';
import { convertNode } from './lib/ts/ts-to-ast';
import { printAstNode } from './lib/printing';

function compile(fileNames: string[], options: ts.CompilerOptions) {
  let program = ts.createProgram(fileNames, options);

  const sourceFile = program.getSourceFile(fileNames[0])!;
  const ast = convertNode(sourceFile, sourceFile);
  printAstNode(ast, process.stdout);
}

function printTsNode(node: ts.Node, prefix: string) {
  process.stdout.write(`${prefix}${ts.SyntaxKind[node.kind]} ${node.getFullStart()} ${node.getStart()} ${node.getEnd()}\n`);
  node.forEachChild(child => printTsNode(child, prefix + '  '));
}

async function main() {
  compile(['example/program.ts'], {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS
  });
}

main().catch(e => {
  console.error(e);
  process.exitCode = 1;
});
