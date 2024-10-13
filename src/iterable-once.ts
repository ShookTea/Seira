export abstract class IterableOnce<T> implements Iterable<T> {
  abstract getLength(): number;
  abstract toArray(): T[];
  abstract map<V>(mapper: (t: T) => V): IterableOnce<V>;
  abstract flatMap<V>(mapper: (t: T) => IterableOnce<V>): IterableOnce<V>;
  abstract filter(predicate: (t: T) => boolean): IterableOnce<T>;
  abstract count(predicate: (t: T) => boolean): number;
  abstract exists(predicate: (t: T) => boolean): boolean;
  abstract forAll(predicate: (t: T) => boolean): boolean;
  abstract forEach(consumer: (t: T) => void): void;
  abstract reduceLeft<V>(initialValue: V, op: (a: V, b: T) => V): V;
  abstract reduceRight<V>(initialValue: V, op: (a: T, b: V) => V): V;
  abstract [Symbol.iterator](): Iterator<T>;
  abstract at(index: number): T;

  isEmpty(): boolean {
    return this.getLength() === 0;
  }

  filterNot(predicate: (t: T) => boolean): IterableOnce<T> {
    return this.filter((v) => !predicate(v));
  }
}
