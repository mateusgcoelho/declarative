export class Signal<T> {
  private value: T;
  private observers: Set<() => void>;

  constructor(initialValue: T) {
    this.value = initialValue;
    this.observers = new Set();
  }

  // Get the current state value
  get(): T {
    return this.value;
  }

  // Set a new state value and notify observers
  set(fn: (prev: T) => T): void {
    const newValue = fn(this.value);
    if (newValue !== this.value) {
      this.value = newValue;
      this.notify();
    }
  }

  // Subscribe to state changes
  subscribe(observer: () => void): void {
    this.observers.add(observer);
  }

  // Unsubscribe from state changes
  unsubscribe(observer: () => void): void {
    this.observers.delete(observer);
  }

  // Notify all observers
  private notify(): void {
    this.observers.forEach((observer) => observer());
    (globalThis as any).notifyNative();
  }
}
