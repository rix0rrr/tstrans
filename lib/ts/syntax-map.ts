import * as ts from 'typescript';
import { AstNodeDefinition } from '../generic/definition';
import { REGULAR_NODES, TOKEN, BINARY_OPERATOR, KEYWORD } from './nodes';

export const SYNTAX_MAP = new Map<ts.SyntaxKind, AstNodeDefinition>();

for (const node of REGULAR_NODES) {
  const kind = node.attributes.kind;
  if (!kind) { throw new Error(`Node ${node} from the REGULAR_NODES array does not have a 'kind' attribute`); }
  SYNTAX_MAP.set(kind, node);
}

for (let kind = ts.SyntaxKind.FirstBinaryOperator; kind <= ts.SyntaxKind.LastBinaryOperator; kind++) {
  SYNTAX_MAP.set(kind, BINARY_OPERATOR);
}

for (let kind = ts.SyntaxKind.FirstKeyword; kind <= ts.SyntaxKind.LastKeyword; kind++) {
  SYNTAX_MAP.set(kind, KEYWORD);
}