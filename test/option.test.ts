import {describe, expect, test} from '@jest/globals';
import { Option } from '../src';

describe('Option', () => {
  describe('Some', () => {
    test('iterator should contain value', () => {
      const some = Option.some(15);
      let container = 0;
      let forLoopCalled = false;
      for (const value of some) {
        container += value;
        forLoopCalled = true;
      }
      expect(container).toEqual(15);
      expect(forLoopCalled).toBeTruthy();
    });

    test('isDefined should return true', () => {
      const some = Option.some(15);
      expect(some.isDefined()).toBeTruthy();
    });
    test('isEmpty should return false', () => {
      const some = Option.some(15);
      expect(some.isEmpty()).toBeFalsy();
    });
    test('getLength should return 1', () => {
      const some = Option.some(15);
      expect(some.getLength()).toEqual(1);
    });

    test('getOrThrowError should return value', () => {
      const some = Option.some(15);
      expect(some.getOrThrowError()).toEqual(15);
    });
    test('getOrElse should return value', () => {
      const some = Option.some(15);
      expect(some.getOrElse(30)).toEqual(15);
    });
    test('getOrNull should return value', () => {
      const some = Option.some(15);
      expect(some.getOrNull()).toEqual(15);
    });
    test('orElse should return the same option', () => {
      const some = Option.some(15);
      expect(some.orElse(Option.some(30)).getOrThrowError()).toEqual(15);
    })

    test('toArray should return a non-empty array', () => {
      const some = Option.some(15);
      expect(some.toArray()).toStrictEqual([15]);
    })

    test('map should return option with mapped value', () => {
      const some = Option.some(15);
      expect(some.map((val) => val * 2).getOrThrowError()).toEqual(30);
    })
    test('flatMap should return mapped value', () => {
      const some = Option.some(15);
      expect(some.flatMap((val) => Option.some(val * 2)).toArray()).toStrictEqual([30]);
    })
    describe('filter', () => {
      test('should return value', () => {
        const some = Option.some(15);
        expect(some.filter((v) => v % 2 !== 0).getOrThrowError()).toEqual(15);
      })
      test('should return empty', () => {
        const some = Option.some(15);
        expect(some.filter((v) => v % 2 === 0).isEmpty()).toBeTruthy();
      })
    });
    describe('filterNot', () => {
      test('should return value', () => {
        const some = Option.some(15);
        expect(some.filterNot((v) => v % 2 === 0).getOrThrowError()).toEqual(15);
      })
      test('should return empty', () => {
        const some = Option.some(15);
        expect(some.filterNot((v) => v % 2 !== 0).isEmpty()).toBeTruthy();
      })
    });
    describe('count', () => {
      test('should return 1', () => {
        const some = Option.some(15);
        expect(some.count((v) => v % 2 !== 0)).toEqual(1);
      })
      test('should return 0', () => {
        const some = Option.some(15);
        expect(some.count((v) => v % 2 === 0)).toEqual(0);
      })
    })
    describe('exists', () => {
      test('should return true', () => {
        const some = Option.some(15);
        expect(some.exists((v) => v % 2 !== 0)).toBeTruthy();
      })
      test('should return false', () => {
        const some = Option.some(15);
        expect(some.exists((v) => v % 2 === 0)).toBeFalsy();
      })
    });
    describe('forAll', () => {
      test('should return true', () => {
        const some = Option.some(15);
        expect(some.forAll((v) => v % 2 !== 0)).toBeTruthy();
      })
      test('should return false', () => {
        const some = Option.some(15);
        expect(some.forAll((v) => v % 2 === 0)).toBeFalsy();
      })
    });
    test('forEach should call consumer', () => {
      const some = Option.some(15);
      let consumerCalled = false;
      let consumerValue = 0;
      some.forEach((val) => {
        consumerValue = val;
        consumerCalled = true;
      });
      expect(consumerCalled).toBeTruthy();
      expect(consumerValue).toEqual(15);
    })
    test('reduceLeft should return reduced value', () => {
      const some = Option.some(15);
      expect(some.reduceLeft(3, (a, b) => a * 2 + b)).toEqual(21);
    })
    test('reduceRight should return reduced value', () => {
      const some = Option.some(15);
      expect(some.reduceRight(3, (a, b) => a * 2 + b)).toEqual(33);
    })
    test('at should return value on index 0', () => {
      const some = Option.some(15);
      expect(some.at(0)).toEqual(15);
      expect(() => some.at(1)).toThrowError();
    })
  });

  describe('None', () => {
    test('iterator should be empty', () => {
      const none = Option.none<number>();
      let container = 0;
      let forLoopCalled = false;
      for (const value of none) {
        container += value;
        forLoopCalled = true;
      }
      expect(container).toEqual(0);
      expect(forLoopCalled).toBeFalsy();
    });

    test('isDefined should return false', () => {
      const none = Option.none<number>();
      expect(none.isDefined()).toBeFalsy();
    });
    test('isEmpty should return true', () => {
      const none = Option.none<number>();
      expect(none.isEmpty()).toBeTruthy();
    });
    test('getLength should return 0', () => {
      const none = Option.none<number>();
      expect(none.getLength()).toEqual(0);
    });

    test('getOrThrowError should throw error', () => {
      const none = Option.none<number>();
      expect(() => none.getOrThrowError()).toThrowError();
    });
    test('getOrElse should return other value', () => {
      const none = Option.none<number>();
      expect(none.getOrElse(30)).toEqual(30);
    });
    test('getOrNull should return null', () => {
      const none = Option.none<number>();
      expect(none.getOrNull()).toBeNull();
    });
    test('orElse should return the other option', () => {
      const none = Option.none<number>();
      expect(none.orElse(Option.some(30)).getOrThrowError()).toEqual(30);
    })

    test('toArray should return an empty array', () => {
      const none = Option.none<number>();
      expect(none.toArray()).toStrictEqual([]);
    })

    test('map should return empty option', () => {
      const none = Option.none<number>();
      expect(none.map((val) => val * 2).isEmpty()).toBeTruthy();
    })
    test('flatMap should return empty collection', () => {
      const none = Option.none<number>();
      expect(none.flatMap((val) => Option.some(val * 2)).isEmpty()).toBeTruthy();
    })
    test('filter should return empty option', () => {
      const none = Option.none<number>();
      expect(none.filter((val) => val % 2 === 0).isEmpty()).toBeTruthy();
    })
    test('filterNot should return empty option', () => {
      const none = Option.none<number>();
      expect(none.filterNot((val) => val % 2 === 0).isEmpty()).toBeTruthy();
    })
    test('count should return 0', () => {
      const none = Option.none<number>();
      expect(none.count((val) => val % 2 === 0)).toEqual(0);
    })
    test('exists should return false', () => {
      const none = Option.none<number>();
      expect(none.exists((val) => val % 2 === 0)).toBeFalsy();
    })
    test('forAll should return true', () => {
      const none = Option.none<number>();
      expect(none.forAll((val) => val % 2 === 0)).toBeTruthy();
    })
    test('forEach consumer should not be called', () => {
      const none = Option.none<number>();
      let consumerCalled = false;
      let consumerValue = 0;
      none.forEach((val) => {
        consumerValue = val;
        consumerCalled = true;
      });
      expect(consumerCalled).toBeFalsy();
      expect(consumerValue).toEqual(0);
    })
    test('reduceLeft should return initial value', () => {
      const none = Option.none<number>();
      expect(none.reduceLeft(3, (a, b) => a * 2 + b)).toEqual(3);
    })
    test('reduceRight should return initial value', () => {
      const none = Option.none<number>();
      expect(none.reduceRight(3, (a, b) => a * 2 + b)).toEqual(3);
    })
    test('at should throw error', () => {
      const none = Option.none<number>();
      expect(() => none.at(0)).toThrowError();
    })
  });
});
