import * as ts from 'typescript';
import { AstNodeDefinition, SlotDefinition, AstNodeDefinitionOptions, AstNode } from './ast';
import { SOURCE_FILE, UNKNOWN_NODE } from './ts-ast';

export function convertNode(node: ts.Node): AstNode {
  for (const [kind, def] of SYNTAX_MAP.entries()) {
    if (node.kind === kind) { return autoConvertNode(node, def); }
  }

  return UNKNOWN_NODE.createNode({});
}

function autoConvertNode<A extends AstNodeDefinition>(node: ts.Node, def: AstNodeDefinition): AstNode {
  let values = pick(node, Object.keys(def.slots));
  values = nodesToAstNodes(values);
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

function nodesToAstNodes(xs: Record<string, any>): Record<string, any> {
  const ret: Record<string, any> = {};
  for (const [key, value] of Object.entries(xs)) {
    if (isTsNode(value)) {
      ret[key] = convertNode(value);
    } else if (isTsNodeArray(value)) {
      ret[key] = value.map(convertNode);
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