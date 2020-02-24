
export function noUndefined<K extends object>(record: K): K {
  const ret: any = {};
  for (const [k, v] of Object.entries(record)) {
    if (v !== undefined) { ret[k] = v; }
  }
  return ret;
}