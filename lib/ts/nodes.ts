import { AstNodeDefinition } from "./ast";


expot const SYNTAX_MAP = new Map<ts.SyntaxKind, AstNodeDefinition>([
  [ts.SyntaxKind.SourceFile, SOURCE_FILE],
]);

export const SOURCE_FILE = new AstNodeDefinition({
  name: 'ts:source_file',
  slots: {
    statements: { list: true }
  }
});

importStatement(node: ImportStatement, context: AstRenderer<C>): OTree;
stringLiteral(node: ts.StringLiteral, children: AstRenderer<C>): OTree;
functionDeclaration(node: ts.FunctionDeclaration, children: AstRenderer<C>): OTree;
identifier(node: ts.Identifier, children: AstRenderer<C>): OTree;
block(node: ts.Block, children: AstRenderer<C>): OTree;
parameterDeclaration(node: ts.ParameterDeclaration, children: AstRenderer<C>): OTree;
returnStatement(node: ts.ReturnStatement, context: AstRenderer<C>): OTree;
binaryExpression(node: ts.BinaryExpression, context: AstRenderer<C>): OTree;
ifStatement(node: ts.IfStatement, context: AstRenderer<C>): OTree;
propertyAccessExpression(node: ts.PropertyAccessExpression, context: AstRenderer<C>): OTree;
callExpression(node: ts.CallExpression, context: AstRenderer<C>): OTree;
expressionStatement(node: ts.ExpressionStatement, context: AstRenderer<C>): OTree;
token<A extends ts.SyntaxKind>(node: ts.Token<A>, context: AstRenderer<C>): OTree;
objectLiteralExpression(node: ts.ObjectLiteralExpression, context: AstRenderer<C>): OTree;
newExpression(node: ts.NewExpression, context: AstRenderer<C>): OTree;
propertyAssignment(node: ts.PropertyAssignment, context: AstRenderer<C>): OTree;
variableStatement(node: ts.VariableStatement, context: AstRenderer<C>): OTree;
variableDeclarationList(node: ts.VariableDeclarationList, context: AstRenderer<C>): OTree;
variableDeclaration(node: ts.VariableDeclaration, context: AstRenderer<C>): OTree;
jsDoc(node: ts.JSDoc, context: AstRenderer<C>): OTree;
arrayLiteralExpression(node: ts.ArrayLiteralExpression, context: AstRenderer<C>): OTree;
shorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment, context: AstRenderer<C>): OTree;
forOfStatement(node: ts.ForOfStatement, context: AstRenderer<C>): OTree;
classDeclaration(node: ts.ClassDeclaration, context: AstRenderer<C>): OTree;
constructorDeclaration(node: ts.ConstructorDeclaration, context: AstRenderer<C>): OTree;
propertyDeclaration(node: ts.PropertyDeclaration, context: AstRenderer<C>): OTree;
methodDeclaration(node: ts.MethodDeclaration, context: AstRenderer<C>): OTree;
interfaceDeclaration(node: ts.InterfaceDeclaration, context: AstRenderer<C>): OTree;
propertySignature(node: ts.PropertySignature, context: AstRenderer<C>): OTree;
methodSignature(node: ts.MethodSignature, context: AstRenderer<C>): OTree;
asExpression(node: ts.AsExpression, context: AstRenderer<C>): OTree;
prefixUnaryExpression(node: ts.PrefixUnaryExpression, context: AstRenderer<C>): OTree;
spreadElement(node: ts.SpreadElement, context: AstRenderer<C>): OTree;
spreadAssignment(node: ts.SpreadAssignment, context: AstRenderer<C>): OTree;
templateExpression(node: ts.TemplateExpression, context: AstRenderer<C>): OTree;
nonNullExpression(node: ts.NonNullExpression, context: AstRenderer<C>): OTree;
parenthesizedExpression(node: ts.ParenthesizedExpression, context: AstRenderer<C>): OTree;
maskingVoidExpression(node: ts.VoidExpression, context: AstRenderer<C>): OTree;
noSubstitutionTemplateLiteral(node: ts.NoSubstitutionTemplateLiteral, context: AstRenderer<C>): OTree;

export const UNKNOWN_NODE = new AstNodeDefinition({
  name: 'unknown_node',
  slots: {},
});