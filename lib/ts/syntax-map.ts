import * as ts from 'typescript';
import { AstNodeDefinition } from '../ast';
import { SOURCE_FILE } from './nodes';

const SYNTAX_MAP = new Map<ts.SyntaxKind, AstNodeDefinition>([
  [ts.SyntaxKind.SourceFile, SOURCE_FILE],
]);
