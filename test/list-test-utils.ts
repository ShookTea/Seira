import { List } from '../src';
import {describe, expect, test} from '@jest/globals';

export function listTestUtils(creator: (values: number[]) => List<number>) {
  describe('List methods', () => {
    test('concat', () => {
      const a = creator([1, 2, 3]);
      const b = creator([4, 5, 6]);
      expect(a.concat(b).toArray()).toStrictEqual([1, 2, 3, 4, 5, 6]);
    });
    test('append', () => {
      const list = creator([1, 2, 3]);
      expect(list.append(4).toArray()).toStrictEqual([1, 2, 3, 4]);
    })
    test('appendAll', () => {
      const a = creator([1, 2, 3]);
      const b = creator([4, 5, 6]);
      expect(a.appendAll(b).toArray()).toStrictEqual([1, 2, 3, 4, 5, 6]);
    });
    test('prepend', () => {
      const list = creator([1, 2, 3]);
      expect(list.prepend(4).toArray()).toStrictEqual([4, 1, 2, 3]);
    })
    test('prependAll', () => {
      const a = creator([1, 2, 3]);
      const b = creator([4, 5, 6]);
      expect(a.prependAll(b).toArray()).toStrictEqual([4, 5, 6, 1, 2, 3]);
    });
  });
}
