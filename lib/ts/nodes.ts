import { AstNodeDefinition, SlotDefinition } from "../generic/definition";
import * as ts from 'typescript';

const sharedNodeSlots: Record<string, SlotDefinition> = {
  flags: { optional: true, type: 'string', list: true },
  modifiers: { list: true, optional: true },
  decorators: { list: true, optional: true },
};

const sharedNodeAttributes = {
  tsflags: true,
};

export const REGULAR_NODES = [
  new AstNodeDefinition('ts:source_file', {
    slots: {
      statements: { list: true }
    },
    attributes: {
      kind: ts.SyntaxKind.SourceFile,
    }
  }),

  new AstNodeDefinition('ts:string_literal', {
    slots: {
      text: { type: 'string' }
    },
    attributes: {
      kind: ts.SyntaxKind.StringLiteral,
    }
  }),

  new AstNodeDefinition('ts:function_declaration', {
    slots: {
      name: { optional: true },
      body: { optional: true },
      type: { optional: true },
      parameters: { list: true },
      ...sharedNodeSlots,
    },
    attributes: {
      kind: ts.SyntaxKind.FunctionDeclaration,
      ...sharedNodeAttributes,
    }
  }),

  new AstNodeDefinition('ts:identifier', {
    slots: {
      text: { type: 'string' },
    },
    attributes: {
      kind: ts.SyntaxKind.Identifier,
      useText: true,
    }
  }),

  new AstNodeDefinition('ts:block', {
    slots: {
      statements: { list: true },
    },
    attributes: {
      kind: ts.SyntaxKind.Block,
    }
  }),

  new AstNodeDefinition('ts:parameter', {
    slots: {
      name: {},
      type: { optional: true },
      initializer: { optional: true },
      dotDotDotToken: { optional: true },
      ...sharedNodeSlots,
    },
    attributes: {
      kind: ts.SyntaxKind.Parameter,
      ...sharedNodeAttributes,
    }
  }),

  new AstNodeDefinition('ts:return_statement', {
    slots: {
      expression: { optional: true },
    },
    attributes: {
      kind: ts.SyntaxKind.ReturnStatement,
    }
  }),

  new AstNodeDefinition('ts:binary_expression', {
    slots: {
      left: { },
      right: { },
      operatorToken: { },
    },
    attributes: {
      kind: ts.SyntaxKind.BinaryExpression,
    }
  }),

  new AstNodeDefinition('ts:if_statement', {
    slots: {
      expression: { },
      thenStatement: { },
      elseStatement: { optional: true },
    },
    attributes: {
      kind: ts.SyntaxKind.IfStatement,
    }
  }),

  new AstNodeDefinition('ts:property_access_expression', {
    slots: {
      expression: { },
      name: { },
      questionDotToken: { optional: true },
    },
    attributes: {
      kind: ts.SyntaxKind.PropertyAccessExpression,
    }
  }),

  new AstNodeDefinition('ts:call_expression', {
    slots: {
      expression: { },
      arguments: { list: true },
    },
    attributes: {
      kind: ts.SyntaxKind.CallExpression,
    }
  }),

  new AstNodeDefinition('ts:expression_statement', {
    slots: {
      expression: { },
    },
    attributes: {
      kind: ts.SyntaxKind.ExpressionStatement,
    }
  }),

  new AstNodeDefinition('ts:object_literal_expression', {
    slots: {
      properties: { list: true },
    },
    attributes: {
      kind: ts.SyntaxKind.ObjectLiteralExpression,
    }
  }),

  new AstNodeDefinition('ts:new_expression', {
    slots: {
      expression: {  },
      arguments: { list: true, optional: true },
    },
    attributes: {
      kind: ts.SyntaxKind.NewExpression,
    }
  }),

  new AstNodeDefinition('ts:property_assignment', {
    slots: {
      name: { },
      initializer: { },
    },
    attributes: {
      kind: ts.SyntaxKind.PropertyAssignment,
    }
  }),

  new AstNodeDefinition('ts:variable_statement', {
    slots: {
      declarationList: { },
      ...sharedNodeSlots,
    },
    attributes: {
      kind: ts.SyntaxKind.VariableStatement,
      ...sharedNodeAttributes,
    }
  }),

  new AstNodeDefinition('ts:variable_declaration_list', {
    slots: {
      declarations: { list: true },
      ...sharedNodeSlots,
    },
    attributes: {
      kind: ts.SyntaxKind.VariableDeclarationList,
      ...sharedNodeAttributes,
    }
  }),

  new AstNodeDefinition('ts:variable_declaration', {
    slots: {
      name: { },
      type: { optional: true },
      initializer: { optional: true },
      ...sharedNodeSlots,
    },
    attributes: {
      kind: ts.SyntaxKind.VariableDeclaration,
      ...sharedNodeAttributes,
    }
  }),

  new AstNodeDefinition('ts:array_literal_expression', {
    slots: {
      elements: { list: true },
    },
    attributes: {
      kind: ts.SyntaxKind.ArrayLiteralExpression,
    }
  }),

  new AstNodeDefinition('ts:shorthand_property_assignment', {
    slots: {
      name: { },
    },
    attributes: {
      kind: ts.SyntaxKind.ShorthandPropertyAssignment,
    }
  }),

  new AstNodeDefinition('ts:for_of_statement', {
    slots: {
      expression: { },
      initializer: { },
      awaitModifier: { optional: true },
    },
    attributes: {
      kind: ts.SyntaxKind.ForOfStatement,
    }
  }),

  new AstNodeDefinition('ts:class_declaration', {
    slots: {
      name: { optional: true },
      heritageClauses: { list: true, optional: true },
      members: { list: true },
      ...sharedNodeSlots,
    },
    attributes: {
      kind: ts.SyntaxKind.ClassDeclaration,
      ...sharedNodeAttributes,
    }
  }),

  new AstNodeDefinition('ts:constructor_declaration', {
    slots: {
      name: { optional: true },
      body: { optional: true },
      type: { optional: true },
      parameters: { list: true },
      ...sharedNodeSlots,
    },
    attributes: {
      kind: ts.SyntaxKind.Constructor,
      ...sharedNodeAttributes,
    }
  }),

  new AstNodeDefinition('ts:property_declaration', {
    slots: {
      name: { },
      initializer: { optional: true },
      type: { optional: true },
      questionToken: { optional: true },
      exclamationToken: { optional: true },
      ...sharedNodeSlots,
    },
    attributes: {
      kind: ts.SyntaxKind.PropertyDeclaration,
      ...sharedNodeAttributes,
    }
  }),

  new AstNodeDefinition('ts:property_signature', {
    slots: {
      name: { },
      initializer: { optional: true },
      type: { optional: true },
      questionToken: { optional: true },
      ...sharedNodeSlots,
    },
    attributes: {
      kind: ts.SyntaxKind.PropertySignature,
      ...sharedNodeAttributes,
    }
  }),

  new AstNodeDefinition('ts:method_declaration', {
    slots: {
      name: { optional: true },
      body: { optional: true },
      type: { optional: true },
      parameters: { list: true },
      ...sharedNodeSlots,
    },
    attributes: {
      kind: ts.SyntaxKind.MethodDeclaration,
      ...sharedNodeAttributes,
    }
  }),

  new AstNodeDefinition('ts:method_signature', {
    slots: {
      name: { optional: true },
      body: { optional: true },
      type: { optional: true },
      parameters: { list: true },
      ...sharedNodeSlots,
    },
    attributes: {
      kind: ts.SyntaxKind.MethodSignature,
      ...sharedNodeAttributes,
    }
  }),

  new AstNodeDefinition('ts:interface_declaration', {
    slots: {
      name: { optional: true },
      heritageClauses: { list: true, optional: true },
      members: { list: true },
      ...sharedNodeSlots,
    },
    attributes: {
      kind: ts.SyntaxKind.InterfaceDeclaration,
      ...sharedNodeAttributes,
    }
  }),

  new AstNodeDefinition('ts:decorator', {
    slots: {
      expression: { },
    },
    attributes: {
      kind: ts.SyntaxKind.Decorator,
    }
  }),

  new AstNodeDefinition('ts:as_expression', {
    slots: {
      expression: { },
      type: { },
    },
    attributes: {
      kind: ts.SyntaxKind.AsExpression,
    }
  }),

  new AstNodeDefinition('ts:prefix_unary_expression', {
    slots: {
      operator: { type: 'string' /* FIMXE: actually number */ },
      operand: { },
    },
    attributes: {
      kind: ts.SyntaxKind.PrefixUnaryExpression,
    }
  }),

  new AstNodeDefinition('ts:postfix_unary_expression', {
    slots: {
      operator: { type: 'string' /* FIMXE: actually number */ },
      operand: { },
    },
    attributes: {
      kind: ts.SyntaxKind.PostfixUnaryExpression,
    }
  }),

  new AstNodeDefinition('ts:spread_element', {
    slots: {
      expression: { },
    },
    attributes: {
      kind: ts.SyntaxKind.SpreadElement,
    }
  }),

  new AstNodeDefinition('ts:spread_assignment', {
    slots: {
      expression: { },
    },
    attributes: {
      kind: ts.SyntaxKind.SpreadAssignment,
    }
  }),

  new AstNodeDefinition('ts:template_expression', {
    slots: {
      head: { },
      templateSpans: { list: true },
    },
    attributes: {
      kind: ts.SyntaxKind.TemplateExpression,
    }
  }),

  new AstNodeDefinition('ts:template_head', {
    slots: {
      rawText: { optional: true, type: 'string' },
    },
    attributes: {
      kind: ts.SyntaxKind.TemplateHead,
    }
  }),

  new AstNodeDefinition('ts:template_middle', {
    slots: {
      rawText: { optional: true, type: 'string' },
    },
    attributes: {
      kind: ts.SyntaxKind.TemplateMiddle,
    }
  }),

  new AstNodeDefinition('ts:template_tail', {
    slots: {
      rawText: { optional: true, type: 'string' },
    },
    attributes: {
      kind: ts.SyntaxKind.TemplateTail,
    }
  }),

  new AstNodeDefinition('ts:template_span', {
    slots: {
      expression: {},
      literal: {},
    },
    attributes: {
      kind: ts.SyntaxKind.TemplateSpan,
    }
  }),

  new AstNodeDefinition('ts:non_null_expression', {
    slots: {
      expression: {},
    },
    attributes: {
      kind: ts.SyntaxKind.NonNullExpression,
    }
  }),

  new AstNodeDefinition('ts:parenthesized_expression', {
    slots: {
      expression: {},
    },
    attributes: {
      kind: ts.SyntaxKind.ParenthesizedExpression,
    }
  }),

  new AstNodeDefinition('ts:no_substitution_template_literal', {
    slots: {
      text: { type: 'string'},
    },
    attributes: {
      kind: ts.SyntaxKind.NoSubstitutionTemplateLiteral,
    }
  }),
];

export const TOKEN = new AstNodeDefinition('ts:token', {
  slots: {
    text: { type: 'string' },
  },
  attributes: {
    useText: true,
  }
});

export const KEYWORD = new AstNodeDefinition('ts:keyword', {
  slots: {
    text: { type: 'string' },
  },
  attributes: {
    useText: true,
  }
});

export const BINARY_OPERATOR = new AstNodeDefinition('ts:binary_operator', {
  slots: {
    text: { type: 'string' },
  },
  attributes: {
    useText: true,
  }
});

export const UNKNOWN_NODE = new AstNodeDefinition('unknown_node', {
  slots: {},
});