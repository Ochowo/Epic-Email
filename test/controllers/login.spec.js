import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';

chai.use(chaiHttp);

const { expect } = chai;

describe('User Login', () => {
  it('should return 401 for a user that does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'tester@gmail.com', password: 'angle123' })
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body)
          .to.have.property('message')
          .equal('User does not exist');
        done();
      });
  });

  it('should not allow wrong user credentials', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'test@gmail.com', password: 'password123' })
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res.body)
          .to.have.property('message')
          .equal('Invalid credentials');
        done();
      });
  });

  it('should sign in a user and save token', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'test@gmail.com', password: 'testing123' })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.be.an('object');
        expect(res.body.data).to.have.property('token');
        expect(res.body)
          .to.have.property('message')
          .equal('Login successful');
        done();
      });
  });
});
