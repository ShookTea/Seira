import { IterableOnce } from './iterable-once';

export abstract class List<T, CreatedType extends IterableOnce<T> = IterableOnce<T>> extends IterableOnce<T> {
  protected abstract buildFromArray(value: T[]): CreatedType;

  public concat(other: IterableOnce<T>): CreatedType {
    return this.buildFromArray([ ...this, ...other]);
  }

  public append(value: T): CreatedType {
    return this.buildFromArray([ ...this, value ]);
  }

  public appendAll(other: IterableOnce<T>): CreatedType {
    return this.concat(other);
  }

  public prepend(value: T): CreatedType {
    return this.buildFromArray([ value, ...this ]);
  }

  public prependAll(other: IterableOnce<T>): CreatedType {
    return this.buildFromArray([ ...other, ...this ]);
  }
}
