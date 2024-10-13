import { describe } from '@jest/globals';
import { LinkedList } from '../src';
import { iterableOnceTestUtils } from './iterable-once-test-utils';
import { listTestUtils } from './list-test-utils';

describe('LinkedList', () => {
  const creator = (values: number[]) => LinkedList.fromArray(values);

  iterableOnceTestUtils(creator);
  listTestUtils(creator);
});
