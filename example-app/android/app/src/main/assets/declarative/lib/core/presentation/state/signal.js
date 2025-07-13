export class Signal {
    value;
    observers;
    constructor(initialValue) {
        this.value = initialValue;
        this.observers = new Set();
    }
    // Get the current state value
    get() {
        return this.value;
    }
    // Set a new state value and notify observers
    set(fn) {
        const newValue = fn(this.value);
        if (newValue !== this.value) {
            this.value = newValue;
            this.notify();
        }
    }
    // Subscribe to state changes
    subscribe(observer) {
        this.observers.add(observer);
    }
    // Unsubscribe from state changes
    unsubscribe(observer) {
        this.observers.delete(observer);
    }
    // Notify all observers
    notify() {
        this.observers.forEach((observer) => observer());
    }
}
//# sourceMappingURL=signal.js.map