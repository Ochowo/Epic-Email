import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
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
  confirmPassword:'password',
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
    it('should register a new user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(201);
          res.body.status.should.equal(201);
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.data.should.be.a('array');
          done();
        });
    });
    it('should register a new user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(newUser2)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.data.should.be.a('array');
          done();
        });
    });
    it('should not register a new user if email exist', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should not register a new user if input fields are empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(emptyUser)
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

  // ==== Login a user ==== //

  describe(' POST /auth/login - login a user', () => {
    it('should not login a user on invalid inputs', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(invalidLogin)
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
    it('should not login a user if email is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
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
    it('should not login a user if password is wrong', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(wrongPassword)
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
    it('should login a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(loginDetails)
        .end((err, res) => {
          if (err) throw err;
          userToken = res.body.data[0].token;
          res.status.should.equal(200);
          res.body.status.should.equal(200);
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.data.should.be.a('array');
          done();
        });
    });
  });

  // ====Create an Email==== //
  describe('POST/messages', () => {
    it('should create a message', (done) => {
      chai.request(app)
        .post('/api/v1/messages')
        .send(newMessage)
        .set('x-access-token', userToken)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(201);
          res.body.status.should.equal(201);
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.data.should.be.a('array');
          done();
        });
    });
    it('should not create a message if token is not provided', (done) => {
      chai.request(app)
        .post('/api/v1/messages')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          done();
        });
    });
  });
  // ====Get all Email==== //
  describe('GET /messages', () => {
    it('should return a list of all received messages', (done) => {
      chai.request(app)
        .get('/api/v1/messages')
        .set('x-access-token', userToken)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(200);
          res.body.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('number');
          res.body.data.should.be.a('array');
          done();
        });
    });
    it('should not get messages if token is not provided', (done) => {
      chai.request(app)
        .get('/api/v1/messages')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should not get messages if token is wrong', (done) => {
      chai.request(app)
        .get('/api/v1/messages')
        .set('x-access-token', wrongToken)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          done();
        });
    });
  });
  // ====Get all sent Email==== //
  describe('GET /messages/sent', () => {
    it('should not get messages if token is not provided', (done) => {
      chai.request(app)
        .get('/api/v1/messages/sent')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          res.body.error.should.equal('Unauthorized access.');
          done();
        });
    });
    it('should not get messages if token is wrong', (done) => {
      chai.request(app)
        .get('/api/v1/messages/sent')
        .set('x-access-token', wrongToken)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          done();
        });
    });
  });
  describe('GET /messages/unread', () => {
    it('should not get messages if token is not provided', (done) => {
      chai.request(app)
        .get('/api/v1/messages/unread')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should not get messages if token is wrong', (done) => {
      chai.request(app)
        .get('/api/v1/messages/unread')
        .set('x-access-token', wrongToken)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          done();
        });
    });
  });
  // ====Get a specific Email==== //
  describe('GET /messages/<message-id>', () => {
    it('should not fetch a specific message if token is not provided', (done) => {
      chai.request(app)
        .get('/api/v1/messages/:id')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should not fetch a specific message if token is wrong', (done) => {
      chai.request(app)
        .get('/api/v1/messages/:id')
        .set('x-access-token', wrongToken)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          done();
        });
    });
  });
  // ==== Delete a specific Email==== //
  describe('GET /messages/<message-id>', () => {
    it('should not delete a specific message if token is not provided', (done) => {
      chai.request(app)
        .delete('/api/v1/messages/:id')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should not delete a specific message if token is wrong', (done) => {
      chai.request(app)
        .delete('/api/v1/messages/:id')
        .set('x-access-token', wrongToken)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          done();
        });
    });
  });

  // ====Create a Group==== //
  describe('POST/groups', () => {
    it('should create a group', (done) => {
      chai.request(app)
        .post('/api/v1/groups')
        .send(newGroup)
        .set('x-access-token', userToken)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(201);
          res.body.status.should.equal(201);
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.data.should.be.a('array');
          done();
        });
    });
    it('should not create a group if token is not provided', (done) => {
      chai.request(app)
        .post('/api/v1/groups')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          done();
        });
    });
  });
  // ====Get all Email==== //
  describe('GET /groups', () => {
    it('should return a list of all the groups', (done) => {
      chai.request(app)
        .get('/api/v1/groups')
        .set('x-access-token', userToken)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(200);
          res.body.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('number');
          res.body.data.should.be.a('array');
          done();
        });
    });
    it('should not get groups if token is not provided', (done) => {
      chai.request(app)
        .get('/api/v1/groups')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should not get groups if token is wrong', (done) => {
      chai.request(app)
        .get('/api/v1/groups')
        .set('x-access-token', wrongToken)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          done();
        });
    });
  });
});
