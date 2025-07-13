export * from "./core/presentation/router/index.js";
export * from "./core/presentation/state/index.js";
export * from "./core/presentation/ui/index.js";

if (!(globalThis as any).__functionRegistry) {
  (globalThis as any).__functionRegistry = {};
  (globalThis as any).__nextFunctionId = 1;
}

export function registerFunction(fn: Function): string {
  var nextId = (globalThis as any).__nextFunctionId + 1;
  const id = `fn_${nextId}`;
  (globalThis as any).__functionRegistry[id] = fn;
  (globalThis as any).__nextFunctionId = nextId;
  return id;
}
