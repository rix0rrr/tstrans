export interface AstNodeDefinitionOptions {
  readonly name: string;
  readonly slots: Record<string, SlotDefinition>;
}

function defaultSlotDefinition(def: SlotDefinition): SlotDefinition {
  return {
    list: def.list ?? false,
    optional: def.optional ?? false,
    type: def.type ?? 'node',
  };
}

/**
 * Generic AST node
 */
export class AstNodeDefinition {
  public readonly slots: Record<string, SlotDefinition>;
  public readonly name: string;

  constructor(options: AstNodeDefinitionOptions) {
    this.name = options.name;
    this.slots = options.slots;
  }

  public createNode(values: Record<string, any>) {
    for (const [key, value] of Object.entries(values)) {
      if (!(key in this.slots)) { throw new Error(`Not a valid slot on '${this.name}': ${key}`); }
      validateSlotValue(value, this.slots[key]);
    }
    const missing = this.requiredSlots().filter(k => !(k in values));
    if (missing.length) {
      throw new Error(`Missing slots creating '${this.name}': ${missing}`);
    }

    return new AstNode(this, values);
  }

  public isNodeSlot(slotName: string) {
    if (!this.slots[slotName]) { return false; }
    const def = defaultSlotDefinition(this.slots[slotName]);
    return def.type === 'node' && !def.list;
  }

  public isNodeArraySlot(slotName: string) {
    if (!this.slots[slotName]) { return false; }
    const def = defaultSlotDefinition(this.slots[slotName]);
    return def.type === 'node' && def.list;
  }

  private requiredSlots(): string[] {
    return Object.entries(this.slots).filter(([_, v]) => !v.optional).map(([k, _]) => k);
  }
}

function validateSlotValue(value: any, def: SlotDefinition) {
  def = defaultSlotDefinition(def);
  if (def.list) {
    if (!Array.isArray(value)) {
      throw new Error(`Expected array, got '${value}'`);
    }
    value.forEach((el: any) => validateSlotValueType(el, def));
    return;
  }
  if (Array.isArray(value)) {
    throw new Error(`Expected singleton, got array: '${value.join(', ')}'`);
  }
  validateSlotValueType(value, def);
}

function validateSlotValueType(value: any, def: SlotDefinition) {
  switch (def.type) {
    case 'node':
      if (!(value instanceof AstNode)) {
        throw new Error(`Expected node, got '${value}'`);
      }
      break;
    case 'string':
      if (typeof value !== 'string') {
        throw new Error(`Expected string, got '${value}'`);
      }
      break;
  }
}

export class AstNode {
  constructor(public readonly definition: AstNodeDefinition, public readonly values: Record<string, any>) {
  }
}

export type SlotDefinition = {
  type?: 'node' | 'string';
  list?: boolean;
  optional?: boolean;
}