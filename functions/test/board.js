const assert = require('assert');

const board = require('../board');

describe('Board', function() {
  describe('winining horizontal input', function() {
    it('should return true since x is winning at top', function() {
      let result = board._won(['x','x','x',' ',' ',' ',' ',' ',' '], 'x');
      assert.equal(true, result);
    });
    it('should return true since x is winning at bottom', function() {
      let result = board._won([' ',' ',' ',' ',' ',' ','x','x','x'], 'x');
      assert.equal(true, result);
    });
    it('should return true since x is winning in the middle', function() {
      let result = board._won([' ',' ',' ','x','x','x',' ',' ',' '], 'x');
      assert.equal(true, result);
    });
  });

  describe('winining vertical input', function() {
    it('should return true since x is winning at left', function() {
      let result = board._won(['x','x',' ','x',' ',' ','x',' ',' '], 'x');
      assert.equal(true, result);
    });
    it('should return true since x is winning at center', function() {
      let result = board._won([' ','x',' ',' ','x',' ',' ','x',' '], 'x');
      assert.equal(true, result);
    });
    it('should return true since x is winning in the right', function() {
      let result = board._won([' ',' ','x',' ','x','x',' ',' ','x'], 'x');
      assert.equal(true, result);
    });
  });

  describe('winining diagonal input', function() {
    it('should return true since x is winning diagonally from left \\', function() {
      let result = board._won(['x','x',' ',' ','x',' ','x',' ','x'], 'x');
      assert.equal(true, result);
    });
    it('should return true since x is winning diagonally from right /', function() {
      let result = board._won([' ','x','x',' ','x',' ','x',' ',' '], 'x');
      assert.equal(true, result);
    });
  });

  describe('best move for x to win', function() {
    it('should be index 2 since x will win', function() {
      let result = board._minimax(['x','x',' ',' ','o','o',' ',' ',' '], 'x');
      assert.equal(2, result.index);
    });
    it('should be index 5 because o is about to win', function() {
      let result = board._minimax(['x',' ',' ','o','o',' ',' ',' ',' '], 'x');
      assert.equal(5, result.index);
    });
  });
});