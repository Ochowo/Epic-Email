import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import 'babel-polyfill';
// import jwt from 'jsonwebtoken';
import app from '../index';

dotenv.config();
chai.use(chaiHttp);
chai.should();

let userToken;
const wrongToken = 'ddnkcjvkdc';
// Decode token

const newUser = {
  email: 'ochowo@gmail.com',
  firstName: 'Ochowo',
  lastName: 'Ikongbeh',
  password: 'password',
  confirmPassword: 'password',
};
const newUser2 = {
  email: 'ochowoo@gmail.com',
  firstName: 'Ochowo',
  lastName: 'Ikongbeh',
  password: 'password',
  confirmPassword: 'password',
};
const invalidEmail = {
  email: 'ochowo2gmail.com',
  firstName: 'Ochowo',
  lastName: 'Ikongbeh',
  password: 'password',
};
const emptyUser = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
};
const loginDetails = {
  email: 'ochowo@gmail.com',
  password: 'password',
};
const wrongPassword = {
  email: 'ochowo@gmail.com',
  password: 'pass',
};
const invalidLogin = {
  email: '',
  password: 'tgf',
};
const newMessage = {
  subject: 'Heello',
  message: 'Nice',
  parentMessageId: 2,
  receiverEmail: 'ochowo@gmail.com',
  senderId: 1,
  receiverId: 2,
  status: 'unread',
};
const newGroup = {
  name: 'Funky',
};
const newMember = {
  name: 'oc',
};
describe('Epic Mail Test Suite', () => {
  describe('POST auth/signup - register a new user', () => {
    it('should not register a user if email is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(invalidEmail)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(400);
          res.body.status.should.equal(400);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('object');
          done();
        });
    });
});
