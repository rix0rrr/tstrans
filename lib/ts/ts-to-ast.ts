import * as ts from 'typescript';
import { AstNodeDefinition } from '../generic/definition';
import { AstNode } from '../generic/node';
import { SYNTAX_MAP } from './syntax-map';
import { UNKNOWN_NODE } from './nodes';

export function convertNode(node: ts.Node, sourceFile: ts.SourceFile): AstNode {
  const def = SYNTAX_MAP.get(node.kind);
  if (def) { return autoConvertNode(node, sourceFile, def); }

  return UNKNOWN_NODE.createNode({});
}

function autoConvertNode(node: ts.Node, sourceFile: ts.SourceFile, def: AstNodeDefinition): AstNode {
  const enhancedValues: any = {};

  if (def.attributes.useText) {
    enhancedValues.text = node.getText(sourceFile);
  }
  if (def.attributes.tsflags) {
    enhancedValues.flags = analyzeFlags(node.flags);
  }

  const valueSource = Object.assign({}, node, enhancedValues);

  let values = pick(valueSource, Object.keys(def.slots));
  values = nodesToAstNodes(values, sourceFile);
  return def.createNode(values);
}

function pick(x: object, keys: string[]): Record<string, any> {
  const ret: Record<string, any> = {};
  for (const key of keys) {
    if (key in x) {
      ret[key] = (x as any)[key];
    }
  }
  return ret;
}

function nodesToAstNodes(xs: Record<string, any>, sourceFile: ts.SourceFile): Record<string, any> {
  const ret: Record<string, any> = {};
  for (const [key, value] of Object.entries(xs)) {
    if (isTsNode(value)) {
      ret[key] = convertNode(value, sourceFile);
    } else if (isTsNodeArray(value)) {
      ret[key] = value.map(n => convertNode(n, sourceFile));
    } else {
      ret[key] = value;
    }
  }
  return ret;
}

function isTsNode(x: any): x is ts.Node {
  return typeof x === 'object' && x !== null && x.kind;
}

function isTsNodeArray(x: any): x is ts.Node[] {
  return Array.isArray(x) && x.every(isTsNode);
}

function analyzeFlags(flags: ts.NodeFlags): string[] | undefined {
  const ret: string[] = [];
  for (const f in ts.NodeFlags) {
    if (!isNaN(Number(f)) && (flags & Number(f)) !== 0) {
      ret.push(ts.NodeFlags[f]);
    }
  }
  return ret.length > 0 ? ret : undefined;
}