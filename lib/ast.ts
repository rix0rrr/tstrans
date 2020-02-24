import { noUndefined } from "./util";

export interface AstNodeDefinitionOptions {
  readonly slots: Record<string, SlotDefinition>;
  readonly attributes?: Record<string, any>;
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
  public readonly attributes: Record<string, any>;

  constructor(public readonly name: string, options: AstNodeDefinitionOptions) {
    this.slots = options.slots;
    this.attributes = options.attributes ?? {};
  }

  public createNode(values: Record<string, any>) {
    try {
      values = noUndefined(values);

      for (const [key, value] of Object.entries(values)) {
        if (!(key in this.slots)) { throw new Error(`Not a valid slot on '${this.name}': ${key}`); }
        validateSlotValue(value, this.slots[key]);
      }
      const missing = this.requiredSlots().filter(k => !(k in values));
      if (missing.length) {
        throw new Error(`Missing slots creating '${this.name}': ${missing}`);
      }

      return new AstNode(this, values);
    } catch (e) {
      throw new Error(`While creating a '${this.name}' from '${JSON.stringify(values)}': ${e}`);
    }
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
    case 'number':
      if (typeof value !== 'number') {
        throw new Error(`Expected number, got '${value}'`);
      }
      break;
  }
}

export class AstNode {
  constructor(public readonly definition: AstNodeDefinition, public readonly values: Record<string, any>) {
  }
}

export type SlotDefinition = {
  /**
   * @default node
   */
  type?: 'node' | 'string' | 'number';

  /**
   * Is this a list
   */
  list?: boolean;

  /**
   * Is this field optional
   */
  optional?: boolean;
}