import { describe } from '@jest/globals';
import { Seq } from '../src';
import { iterableOnceTestUtils } from './iterable-once-test-utils';
import { listTestUtils } from './list-test-utils';

describe('Seq', () => {
  const creator = (values: number[]) => Seq.fromArray(values);

  iterableOnceTestUtils(creator);
  listTestUtils(creator);
});
