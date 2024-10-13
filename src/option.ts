import { IterableOnce } from './iterable-once';

export abstract class Option<T> extends IterableOnce<T> {
  public static some<T>(value: T): Option<T> {
    return new Some<T>(value);
  }

  public static none<T>(): Option<T> {
    return new None<T>();
  }

  public isDefined(): boolean {
    return !this.isEmpty();
  }

  public getLength(): number {
    return this.isEmpty() ? 0 : 1;
  }

  public abstract getOrThrowError(): T;
  public getOrElse(other: T): T {
    if (this.isDefined()) {
      return this.getOrThrowError();
    }
    return other;
  }
  public getOrNull(): T|null {
    if (this.isDefined()) {
      return this.getOrThrowError();
    }
    return null;
  }
  public orElse(other: Option<T>): Option<T> {
    if (this.isDefined()) {
      return this;
    }
    return other;
  }

  public toArray(): T[] {
    if (this.isDefined()) {
      return [this.getOrThrowError()];
    }
    return [];
  }

  public map<V>(mapper: (t: T) => V): Option<V> {
    return this.isDefined() ? Option.some(mapper(this.getOrThrowError())) : Option.none();
  }
  public flatMap<V>(mapper: (t: T) => IterableOnce<V>): IterableOnce<V> {
    return this.isDefined() ? mapper(this.getOrThrowError()) : Option.none<V>();
  }

  public filter(predicate: (t: T) => boolean): Option<T> {
    return this.isDefined() && predicate(this.getOrThrowError()) ? this : Option.none();
  }

  public override filterNot(predicate: (t: T) => boolean): Option<T> {
    return this.isDefined() && !predicate(this.getOrThrowError()) ? this : Option.none();
  }

  public count(predicate: (t: T) => boolean): number {
    return this.isDefined() && predicate(this.getOrThrowError()) ? 1 : 0;
  }

  public exists(predicate: (t: T) => boolean): boolean {
    return this.isDefined() && predicate(this.getOrThrowError());
  }

  public forAll(predicate: (t: T) => boolean): boolean {
    return !this.isDefined() || predicate(this.getOrThrowError());
  }

  public forEach(consumer: (t: T) => void): void {
    if (this.isDefined()) {
      consumer(this.getOrThrowError());
    }
  }

  public reduceLeft<V>(initialValue: V, op: (a: V, b: T) => V): V {
    return this.isDefined() ? op(initialValue, this.getOrThrowError()) : initialValue;
  }

  public reduceRight<V>(initialValue: V, op: (a: T, b: V) => V): V {
    return this.isDefined() ? op(this.getOrThrowError(), initialValue) : initialValue;
  }
}

export class Some<T> extends Option<T> {
  private readonly value: T;

  public constructor(value: T) {
    super();
    this.value = value;
  }

  public *[Symbol.iterator](): Iterator<T> {
    yield this.value;
  }

  override isEmpty(): boolean {
    return false;
  }

  override getOrThrowError(): T {
    return this.value;
  }

  override at(index: number): T {
    if (index === 0) {
      return this.value;
    }
    throw new Error('Index out of bounds');
  }
}

export class None<T> extends Option<T> {
  public constructor() {
    super();
  }

  public *[Symbol.iterator](): Iterator<T> {}

  override isEmpty(): boolean {
    return true;
  }

  override getOrThrowError(): T {
    throw new Error('Called getOrThrowError on None');
  }

  override at(index: number): T {
    throw new Error('Index out of bounds');
  }
}
