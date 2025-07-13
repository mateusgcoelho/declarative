export declare class Signal<T> {
    private value;
    private observers;
    constructor(initialValue: T);
    get(): T;
    set(fn: (prev: T) => T): void;
    subscribe(observer: () => void): void;
    unsubscribe(observer: () => void): void;
    private notify;
}
//# sourceMappingURL=signal.d.ts.map