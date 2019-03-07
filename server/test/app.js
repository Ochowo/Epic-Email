import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import app from '../index';

dotenv.config();
chai.use(chaiHttp);
chai.should();

const token = jwt.sign({ email: 'ochowo@gmail.com', userId: 1 }, process.env.SECRET, {
  expiresIn: 86400,
});
const newUser = {
  email: 'ochowo@gmail.com',
  firstName: 'Ochowo',
  lastName: 'Ikongbeh',
  password: 'password',
};
const invalidEmail = {
  email: 'ochowo2gmail.com',
  firstName: 'Ochowo',
  lastName: 'Ikongbeh',
  password: 'password',
}
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
  createdOn: '05, April 2018',
  subject: 'Heello',
  message: 'Nice',
  parentMessageId: '2',
  status: 'draft',
  email: 'ochowoikongbeh@gmail.com',
  senderId: 1,
  receiverId: 1,
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
          res.body.error.should.be.a('string');
          res.body.error.should.equal('Invalid email address');
          done();
        });
    });
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
          res.body.error.should.be.a('string');
          res.body.error.should.equal('Invalid email address');
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
    it('should not register a new user if email exist', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(409);
          res.body.status.should.equal(409);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          res.body.error.should.equal('the email ochowo@gmail.com already exists, please choose another email.');
          done();
        });
    });
  });
  // ====== Login ====== //
  describe('POST auth/login', () => {
    it('should not login a user if email is empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(invalidLogin)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.status.should.equal(400);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          res.body.error.should.equal('Invalid email address');
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
          res.body.error.should.be.a('string');
          res.body.error.should.equal('Invalid email address');
          done();
        });
    });
    it('should not login a user if password is wrong', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(wrongPassword)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          res.body.error.should.equal('Authentication failed. Wrong password');
          done();
        });
    });
    it('should login a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(loginDetails)
        .end((err, res) => {
          if (err) throw err;
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
        .post(`/api/v1/messages?&token=${token}`)
        .send(newMessage)
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
          res.body.error.should.equal('No token provided.');
          done();
        });
    });
    it('should not create message if token is wrong', (done) => {
      chai.request(app)
        .post('/api/v1/messages?token=wrongtoken')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          res.body.error.should.equal('Failed to authenticate user token.');
          done();
        });
    });
  });

  // ====Get all Email==== //
  describe('GET /messages', () => {
    it('should return a list of all received messages', (done) => {
      chai.request(app)
        .get(`/api/v1/messages?&token=${token}`)
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
          res.body.error.should.equal('No token provided.');
          done();
        });
    });
    it('should not get messages if token is wrong', (done) => {
      chai.request(app)
        .get('/api/v1/messages?token=wrongtoken')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          res.body.error.should.equal('Failed to authenticate user token.');
          done();
        });
    });
  });

  // ====Get all sent Email==== //
  describe('GET /messages/sent', () => {
    it('should return a list of all sent messages', (done) => {
      chai.request(app)
        .get(`/api/v1/messages/sent?&token=${token}`)
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
          res.body.error.should.equal('No token provided.');
          done();
        });
    });
    it('should not get messages if token is wrong', (done) => {
      chai.request(app)
        .get('/api/v1/messages/sent?token=wrongtoken')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          res.body.error.should.equal('Failed to authenticate user token.');
          done();
        });
    });
  });

  // ====Get all unread Email==== //
  describe('GET /messages/unread', () => {
    it('should return a list of all unread messages', (done) => {
      chai.request(app)
        .get(`/api/v1/messages/unread?&token=${token}`)
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
          res.body.error.should.equal('No token provided.');
          done();
        });
    });
    it('should not get messages if token is wrong', (done) => {
      chai.request(app)
        .get('/api/v1/messages/unread?token=wrongtoken')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          res.body.error.should.equal('Failed to authenticate user token.');
          done();
        });
    });
  });

  // ====Get a specific Email==== //
  describe('GET /messages/<message-id>', () => {
    it('should fetch a specific order', (done) => {
      chai.request(app)
        .get(`/api/v1/messages/1?token=${token}`)
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
    it('should not fetch a specific message', (done) => {
      chai.request(app)
        .get(`/api/v1/messages/2000?token=${token}`)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(404);
          res.body.status.should.equal(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should not fetch a specific message if token is not provided', (done) => {
      chai.request(app)
        .get('/api/v1/messages/1')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          res.body.error.should.equal('No token provided.');
          done();
        });
    });
    it('should not fetch a specific message if token is wrong', (done) => {
      chai.request(app)
        .get('/api/v1/messages/1?token=wrongtoken')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          res.body.error.should.equal('Failed to authenticate user token.');
          done();
        });
    });
  });

  // ==== Delete a specific Email==== //
  describe('GET /messages/<message-id>', () => {
    it('should delete a specific order', (done) => {
      chai.request(app)
        .delete(`/api/v1/messages/1?token=${token}`)
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
    it('should not delete a specific order', (done) => {
      chai.request(app)
        .delete(`/api/v1/messages/2000?token=${token}`)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(404);
          res.body.status.should.equal(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should not delete a specific message if token is not provided', (done) => {
      chai.request(app)
        .delete('/api/v1/messages/1')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          res.body.error.should.equal('No token provided.');
          done();
        });
    });
    it('should not delete a specific message if token is wrong', (done) => {
      chai.request(app)
        .delete('/api/v1/messages/1?token=wrongtoken')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(401);
          res.body.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.should.be.a('object');
          res.body.status.should.be.a('number');
          res.body.error.should.be.a('string');
          res.body.error.should.equal('Failed to authenticate user token.');
          done();
        });
    });
  });
});
