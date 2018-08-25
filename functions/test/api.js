const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Request', () => {
  describe('/board', () => {
    it('it should return current board', (done) => {
      chai.request(server)
          .get('/')
          .end((_, res) => {
            res.should.have.status(200);
            res.text.should.be.eql('+++++++++');
            done();
          });
    });
  });
  describe('/:board', () => {
    it('it should return new move by o', (done) => {
      chai.request(server)
          .put('/+++++++++')
          .end((_, res) => {
            res.should.have.status(200);
            assert.equal(true, res.text.indexOf('o') !== -1);
            done();
          });
    }).timeout(10000);

    it('it should return 400 not o\'s turn', (done) => {
      chai.request(server)
          .put('/o++++++++')
          .end((_, res) => {
            res.should.have.status(400);
            done();
          });
    }).timeout(10000);
  });
});