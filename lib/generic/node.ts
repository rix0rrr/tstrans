import { AstNodeDefinition } from "./definition";

export class AstNode {
  constructor(public readonly definition: AstNodeDefinition, public readonly values: Record<string, any>) {
  }
}
