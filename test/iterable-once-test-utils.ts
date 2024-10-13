import { IterableOnce } from '../src';
import {describe, expect, test} from '@jest/globals';

export function iterableOnceTestUtils(creator: (values: number[]) => IterableOnce<number>): void {
  describe('IterableOnce methods', () => {
    test('getLength', () => {
      expect(creator([]).getLength()).toEqual(0);
      expect(creator([1, 2, 3]).getLength()).toEqual(3);
    });
    test('isEmpty', () => {
      expect(creator([]).isEmpty).toBeTruthy();
      expect(creator([1, 2, 3]).isEmpty()).toBeFalsy();
    });
    test('toArray', () => {
      expect(creator([]).toArray()).toStrictEqual([]);
      expect(creator([1, 2, 3]).toArray()).toStrictEqual([1, 2, 3]);
    });
    test('map', () => {
      expect(creator([]).map((val) => val * 2).toArray()).toStrictEqual([]);
      expect(creator([1, 2, 3]).map((val) => val * 2).toArray()).toStrictEqual([2, 4, 6]);
    });
    test('flatMap', () => {
      expect(
        creator([])
          .flatMap((val) => creator([val, val * 2]))
          .toArray()
      ).toStrictEqual([]);
      expect(
        creator([1, 2, 3])
          .flatMap((val) => creator([val, val * 2]))
          .toArray()
      ).toStrictEqual([1, 2, 2, 4, 3, 6]);
    });
    test('filter', () => {
      expect(
        creator([])
          .filter((val) => val % 2 === 0)
          .toArray()
      ).toStrictEqual([]);
      expect(
        creator([1, 2, 3, 4])
          .filter((val) => val % 2 === 0)
          .toArray()
      ).toStrictEqual([2, 4]);
    });
    test('filterNot', () => {
      expect(
        creator([])
          .filterNot((val) => val % 2 === 0)
          .toArray()
      ).toStrictEqual([]);
      expect(
        creator([1, 2, 3, 4])
          .filterNot((val) => val % 2 === 0)
          .toArray()
      ).toStrictEqual([1, 3]);
    });
    test('count', () => {
      expect(
        creator([])
          .count((val) => val % 2 === 0)
      ).toEqual(0);
      expect(
        creator([1, 2, 3, 4])
          .count((val) => val % 2 === 0)
      ).toEqual(2);
    })
    test('exists', () => {
      expect(
        creator([])
          .exists((val) => val % 2 === 0)
      ).toBeFalsy();
      expect(
        creator([1, 3])
          .exists((val) => val % 2 === 0)
      ).toBeFalsy();
      expect(
        creator([1, 2, 3])
          .exists((val) => val % 2 === 0)
      ).toBeTruthy();
    })
    test('forAll', () => {
      expect(
        creator([])
          .forAll((val) => val % 2 === 0)
      ).toBeTruthy();
      expect(
        creator([1, 3])
          .forAll((val) => val % 2 === 0)
      ).toBeFalsy();
      expect(
        creator([1, 2, 3])
          .forAll((val) => val % 2 === 0)
      ).toBeFalsy();
      expect(
        creator([2, 4])
          .forAll((val) => val % 2 === 0)
      ).toBeTruthy();
    })
    test('reduceLeft', () => {
      expect(
        creator([])
          .reduceLeft(0, (a, b) => a * 2 + b)
      ).toEqual(0);
      expect(
        creator([1])
          .reduceLeft(0, (a, b) => a * 2 + b)
      ).toEqual(1);
      expect(
        creator([1, 3])
          .reduceLeft(0, (a, b) => a * 2 + b)
      ).toEqual(5);
      expect(
        creator([3, 1])
          .reduceLeft(0, (a, b) => a * 2 + b)
      ).toEqual(7);
      expect(
        creator([1, 3, 5])
          .reduceLeft(0, (a, b) => a * 2 + b)
      ).toEqual(15);
      expect(
        creator([5, 1, 3])
          .reduceLeft(0, (a, b) => a * 2 + b)
      ).toEqual(25);
    })
    test('reduceRight', () => {
      expect(
        creator([])
          .reduceRight(0, (a, b) => a * 2 - b)
      ).toEqual(0);
      expect(
        creator([1])
          .reduceRight(0, (a, b) => a * 2 - b)
      ).toEqual(2);
      expect(
        creator([1, 3])
          .reduceRight(0, (a, b) => a * 2 - b)
      ).toEqual(-4);
      expect(
        creator([3, 1])
          .reduceRight(0, (a, b) => a * 2 - b)
      ).toEqual(4);
      expect(
        creator([1, 3, 5])
          .reduceRight(0, (a, b) => a * 2 - b)
      ).toEqual(6);
      expect(
        creator([5, 1, 3])
          .reduceRight(0, (a, b) => a * 2 - b)
      ).toEqual(14);
    })
    test('forEach', () => {
      let counter = 0;
      let sum = 0;
      creator([]).forEach((val) => {
        counter++;
        sum += val;
      });
      expect(counter).toEqual(0);
      expect(sum).toEqual(0);

      counter = 0;
      sum = 0;
      creator([1, 2, 3]).forEach((val) => {
        counter++;
        sum += val;
      });
      expect(counter).toEqual(3);
      expect(sum).toEqual(6);
    })
    test('Symbol.iterator', () => {
      let counter = 0;
      let sum = 0;
      for (const val of creator([])) {
        counter++;
        sum += val;
      }
      expect(counter).toEqual(0);
      expect(sum).toEqual(0);

      counter = 0;
      sum = 0;
      for (const val of creator([1, 2, 3])) {
        counter++;
        sum += val;
      }
      expect(counter).toEqual(3);
      expect(sum).toEqual(6);
    })
    test('at', () => {
      expect(() => creator([]).at(0)).toThrowError();
      expect(creator([1, 2, 3]).at(0)).toEqual(1);
      expect(creator([1, 2, 3]).at(1)).toEqual(2);
      expect(creator([1, 2, 3]).at(2)).toEqual(3);
      expect(() => creator([1, 2, 3]).at(3)).toThrowError();
    })
  });
}
