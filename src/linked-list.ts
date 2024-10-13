import { List } from './list';
import { IterableOnce } from './iterable-once';

export class LinkedList<T> extends List<T, LinkedList<T>> {
  private readonly value: T;
  private readonly tail: LinkedList<T>;

  constructor(value: T, tail: LinkedList<T>) {
    super();
    this.value = value;
    this.tail = tail;
  }

  public static fromArray<T>(value: T[]): LinkedList<T> {
    let result: LinkedList<T> = new Nil<T>();
    for (let i = value.length - 1; i >= 0; i--) {
      result = new LinkedList<T>(value[i], result);
    }
    return result;
  }

  protected override buildFromArray(value: T[]): LinkedList<T> {
    return LinkedList.fromArray(value);
  }

  override getLength(): number {
    return 1 + this.tail.getLength();
  }

  override toArray(): T[] {
    return [ this.value, ...this.tail.toArray()];
  }

  override map<V>(mapper: (t: T) => V): LinkedList<V> {
    return new LinkedList<V>(
      mapper(this.value),
      this.tail.map(mapper),
    );
  }

  override flatMap<V>(mapper: (t: T) => IterableOnce<V>): LinkedList<V> {
    const result: IterableOnce<V> = mapper(this.value);
    let tail: LinkedList<V> = this.tail.flatMap(mapper);
    for (let i = result.getLength() - 1; i >= 0; i--) {
      tail = new LinkedList<V>(result.at(i), tail);
    }
    return tail;
  }

  override filter(predicate: (t: T) => boolean): LinkedList<T> {
    if (predicate(this.value)) {
      return new LinkedList<T>(this.value, this.tail.filter(predicate));
    }
    return this.tail.filter(predicate);
  }

  override count(predicate: (t: T) => boolean): number {
    const tailResult = this.tail.count(predicate);
    return (predicate(this.value) ? 1 : 0) + tailResult;
  }

  override exists(predicate: (t: T) => boolean): boolean {
    if (predicate(this.value)) {
      return true;
    }
    return this.tail.exists(predicate);
  }

  override forAll(predicate: (t: T) => boolean): boolean {
    if (!predicate(this.value)) {
      return false;
    }
    return this.tail.forAll(predicate);
  }

  override forEach(consumer: (t: T) => void): void {
    consumer(this.value);
    this.tail.forEach(consumer);
  }

  override reduceLeft<V>(initialValue: V, op: (a: V, b: T) => V): V {
    const result = op(initialValue, this.value);
    return this.tail.reduceLeft(result, op);
  }

  override reduceRight<V>(initialValue: V, op: (a: T, b: V) => V): V {
    return op(this.value, this.tail.reduceRight(initialValue, op));
  }

  override at(index: number): T {
    if (index < 0) {
      throw new Error('Index out of bounds');
    }
    if (index === 0) {
      return this.value;
    }
    return this.tail.at(index - 1);
  }

  public *[Symbol.iterator](): Iterator<T> {
    yield this.value;
    yield* this.tail;
  }
}

class Nil<T> extends LinkedList<T> {
  constructor() {
    super(
      null as unknown as T,
      null as unknown as LinkedList<T>,
    );
  }

  override getLength(): number {
    return 0;
  }

  override toArray(): T[] {
    return [];
  }

  override map<V>(_: (t: T) => V): LinkedList<V> {
    return new Nil<V>();
  }

  override flatMap<V>(_: (t: T) => IterableOnce<V>): LinkedList<V> {
    return new Nil<V>();
  }

  override filter(_: (t: T) => boolean): LinkedList<T> {
    return this;
  }

  override count(_: (t: T) => boolean): number {
    return 0;
  }

  override exists(_: (t: T) => boolean): boolean {
    return false;
  }

  override forAll(_: (t: T) => boolean): boolean {
    return true;
  }

  override forEach(_: (t: T) => void) {}

  override reduceLeft<V>(initialValue: V, _: (a: V, b: T) => V): V {
    return initialValue;
  }

  override reduceRight<V>(initialValue: V, _: (a: T, b: V) => V): V {
    return initialValue;
  }

  override at(_: number): T {
    throw new Error('Index out of bounds');
  }

  override *[Symbol.iterator](): Iterator<T> {}
}
