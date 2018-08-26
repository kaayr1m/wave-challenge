const assert = require('assert');

const board = require('../board');

describe('Board', () => {
  describe('winining horizontal input', () => {
    it('should return true since x is winning at top', () => {
      let result = board._won(['x','x','x',' ',' ',' ',' ',' ',' '], 'x');
      assert.equal(true, result);
    });
    it('should return true since x is winning at bottom', () => {
      let result = board._won([' ',' ',' ',' ',' ',' ','x','x','x'], 'x');
      assert.equal(true, result);
    });
    it('should return true since x is winning in the middle', () => {
      let result = board._won([' ',' ',' ','x','x','x',' ',' ',' '], 'x');
      assert.equal(true, result);
    });
  });

  describe('winining vertical input', () => {
    it('should return true since x is winning at left', () => {
      let result = board._won(['x','x',' ','x',' ',' ','x',' ',' '], 'x');
      assert.equal(true, result);
    });
    it('should return true since x is winning at center', () => {
      let result = board._won([' ','x',' ',' ','x',' ',' ','x',' '], 'x');
      assert.equal(true, result);
    });
    it('should return true since x is winning in the right', () => {
      let result = board._won([' ',' ','x',' ','x','x',' ',' ','x'], 'x');
      assert.equal(true, result);
    });
  });

  describe('winining diagonal input', () => {
    it('should return true since x is winning diagonally from left \\', () => {
      let result = board._won(['x','x',' ',' ','x',' ','x',' ','x'], 'x');
      assert.equal(true, result);
    });
    it('should return true since x is winning diagonally from right /', () => {
      let result = board._won([' ','x','x',' ','x',' ','x',' ',' '], 'x');
      assert.equal(true, result);
    });
  });

  describe('best move for o to win', () => {
    it('should be index 2 since o will win', () => {
      let result = board._minimax(['o','o',' ',' ','x',' ',' ',' ',' '], 'o');
      assert.equal(2, result.index);
    });
    it('should be index 5 because x is about to win', () => {
      let result = board._minimax(['o',' ',' ','x','x',' ',' ',' ',' '], 'o');
      assert.equal(5, result.index);
    });
  });
});