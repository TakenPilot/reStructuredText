import assert from 'assert';
import whitespace from '../src/whitespace';

describe('whitespace', function () {
  describe('getFirstNonBlankLineIndex', function () {
    it('1', function () {
      assert.equal(whitespace.getFirstNonBlankLineIndex(['a', '', '', '']), 0);
    });

    it('2', function () {
      assert.equal(whitespace.getFirstNonBlankLineIndex(['a', 'a', '', '']), 0);
    });

    it('3', function () {
      assert.equal(whitespace.getFirstNonBlankLineIndex(['', 'a', 'a', '']), 1);
    });

    it('3', function () {
      assert.equal(whitespace.getFirstNonBlankLineIndex(['', '', 'a', 'a']), 2);
    });
  });

  describe('getLastLineWithIndentIndex', function () {
    it('1', function () {
      assert.equal(whitespace.getLastLineWithIndentIndex(['a', '', '', ''], 0), 0);
    });

    it('2', function () {
      assert.equal(whitespace.getLastLineWithIndentIndex(['a', ' a', '', ''], 0), 0);
    });

    it('3', function () {
      assert.equal(whitespace.getLastLineWithIndentIndex(['', ' a', '  a', ''], 1), 1);
    });

    it('3', function () {
      assert.equal(whitespace.getLastLineWithIndentIndex(['', '', '  a', 'a'], 2), 2);
    });
  });
});
