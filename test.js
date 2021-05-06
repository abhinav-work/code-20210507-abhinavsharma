const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const { app } = require('./index');

describe('Testing the BMI Calculator', () => {
    describe('Testing the custom input functionality', () => {
      it('Should PASS with natural numbers', (done) => {
        request(app)
        .post('/')
        .send({ input: [ {"Gender": "Male", "HeightCm": 171, "WeightKg": 96 } ] })
        .end((err, res) => {
          expect(res.body.code).to.eq(200);
          done();
        });
      });

      it('Should FAIL with empty input', (done) => {
        request(app)
        .post('/')
        .send({ input: [ ] })
        .end((err, res) => {
          expect(res.body.code).to.eq(422);
          done();
        });
      });

      it('Should FAIL with WeightKg equal to 0', (done) => {
        request(app)
        .post('/')
        .send({ input: [ {"Gender": "Male", "HeightCm": 110, "WeightKg": 0 } ] })
        .end((err, res) => {
          expect(res.body.code).to.eq(422);
          done();
        });
      });

      it('Should FAIL with HeightCm equal to 0', (done) => {
        request(app)
        .post('/')
        .send({ input: [ {"Gender": "Male", "HeightCm": 0, "WeightKg": 100 } ] })
        .end((err, res) => {
          expect(res.body.code).to.eq(422);
          done();
        });
      });

      it('Should FAIL with missing HeightCm', (done) => {
        request(app)
        .post('/')
        .send({ input: [ {"Gender": "Male", "WeightKg": 100 } ] })
        .end((err, res) => {
          expect(res.body.code).to.eq(422);
          done();
        });
      });
    });

    describe('Testing the built-in (default) input functionality', () => {
      it('Should PASS with natural numbers', (done) => {
        request(app)
        .post('/')
        .send({ input: [ {"Gender": "Male", "HeightCm": 171, "WeightKg": 96 } ] })
        .end((err, res) => {
          expect(res.body.code).to.eq(200);
          done();
        });
      });

      it('Should FAIL with empty input', (done) => {
        request(app)
        .post('/')
        .send({ input: [ ] })
        .end((err, res) => {
          expect(res.body.code).to.eq(422);
          done();
        });
      });

      it('Should FAIL with WeightKg equal to 0', (done) => {
        request(app)
        .post('/')
        .send({ input: [ {"Gender": "Male", "HeightCm": 110, "WeightKg": 0 } ] })
        .end((err, res) => {
          expect(res.body.code).to.eq(422);
          done();
        });
      });

      it('Should FAIL with HeightCm equal to 0', (done) => {
        request(app)
        .post('/')
        .send({ input: [ {"Gender": "Male", "HeightCm": 0, "WeightKg": 100 } ] })
        .end((err, res) => {
          expect(res.body.code).to.eq(422);
          done();
        });
      });

      it('Should FAIL with missing HeightCm', (done) => {
        request(app)
        .post('/')
        .send({ input: [ {"Gender": "Male", "WeightKg": 100 } ] })
        .end((err, res) => {
          expect(res.body.code).to.eq(422);
          done();
        });
      });
    })
  });