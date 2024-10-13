import { List } from './list';
import { IterableOnce } from './iterable-once';

export class Seq<T> extends List<T, Seq<T>> {
  private readonly value: T[];

  constructor(...value: T[]) {
    super();
    this.value = value;
  }

  public static fromArray<T>(value: T[]): Seq<T> {
    return new Seq<T>(...value);
  }

  protected override buildFromArray(value: T[]): Seq<T> {
    return Seq.fromArray(value);
  }

  public getLength(): number {
    return this.value.length;
  }

  public toArray(): T[] {
    return [...this.value];
  }

  public map<V>(mapper: (t: T) => V): IterableOnce<V> {
    return new Seq<V>(...this.value.map(mapper));
  }

  public flatMap<V>(mapper: (t: T) => IterableOnce<V>): IterableOnce<V> {
    const result: V[] = [];
    this.value.forEach((item) => {
      const mappedItems = mapper(item);
      result.push(...mappedItems);
    });
    return Seq.fromArray(result);
  }

  public filter(predicate: (t: T) => boolean): IterableOnce<T> {
    return Seq.fromArray(this.value.filter(predicate));
  }

  public count(predicate: (t: T) => boolean): number {
    return this.value.filter(predicate).length;
  }

  public exists(predicate: (t: T) => boolean): boolean {
    return this.value.length > 0 && this.value.some(predicate);
  }

  public forAll(predicate: (t: T) => boolean): boolean {
    return this.value.length === 0 || this.value.every(predicate);
  }
  public forEach(consumer: (t: T) => void): void {
    this.value.forEach(consumer);
  }

  public reduceLeft<V>(initialValue: V, op: (a: V, b: T) => V): V {
    let result = initialValue;
    this.forEach((v) => {
      result = op(result, v);
    })
    return result;
  }

  public reduceRight<V>(initialValue: V, op: (a: T, b: V) => V): V {
    let result = initialValue;
    for (let i = this.value.length - 1; i >= 0; i--) {
      result = op(this.value[i], result);
    }
    return result;
  }

  [Symbol.iterator](): Iterator<T> {
    return this.value[Symbol.iterator]();
  }

  override at(index: number): T {
    if (index < 0 || index >= this.value.length) {
      throw new Error('Index out of bounds');
    }
    return this.value[index];
  }
}
