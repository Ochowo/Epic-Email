'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
// import jwt from 'jsonwebtoken';

_chai2.default.use(_chaiHttp2.default);
_chai2.default.should();

var userToken = void 0;
var wrongToken = 'ddnkcjvkdc';
// Decode token

var newUser = {
  email: 'ochowo@gmail.com',
  firstName: 'Ochowo',
  lastName: 'Ikongbeh',
  password: 'password',
  confirmPassword: 'password'
};
var newUser2 = {
  email: 'ochowoo@gmail.com',
  firstName: 'Ochowo',
  lastName: 'Ikongbeh',
  password: 'password',
  confirmPassword: 'password'
};
var invalidEmail = {
  email: 'ochowo2gmail.com',
  firstName: 'Ochowo',
  lastName: 'Ikongbeh',
  password: 'password'
};
var emptyUser = {
  email: '',
  firstName: '',
  lastName: '',
  password: ''
};
var loginDetails = {
  email: 'ochowo@gmail.com',
  password: 'password'
};
var wrongPassword = {
  email: 'ochowo@gmail.com',
  password: 'pass'
};
var invalidLogin = {
  email: '',
  password: 'tgf'
};
var newMessage = {
  subject: 'Heello',
  message: 'Nice',
  parentMessageId: 2,
  receiverEmail: 'ochowo@gmail.com',
  senderId: 1,
  receiverId: 2,
  status: 'unread'
};
var newGroup = {
  name: 'Funky'
};
var newMember = {
  name: 'oc'
};
describe('Epic Mail Test Suite', function () {
  describe('POST auth/signup - register a new user', function () {
    it('should not register a user if email is invalid', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(invalidEmail).end(function (err, res) {
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
    it('should register a new user', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(newUser).end(function (err, res) {
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
    it('should register a new user', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(newUser2).end(function (err, res) {
        if (err) throw err;
        res.body.should.have.property('data');
        res.body.should.have.property('status');
        res.body.should.be.a('object');
        res.body.status.should.be.a('number');
        res.body.data.should.be.a('array');
        done();
      });
    });
    it('should not register a new user if email exist', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(newUser).end(function (err, res) {
        if (err) throw err;
        res.body.should.have.property('error');
        res.body.should.have.property('status');
        res.body.should.be.a('object');
        res.body.status.should.be.a('number');
        res.body.error.should.be.a('string');
        done();
      });
    });
    it('should not register a new user if input fields are empty', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(emptyUser).end(function (err, res) {
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

  describe(' POST /auth/login - login a user', function () {
    it('should not login a user on invalid inputs', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send(invalidLogin).end(function (err, res) {
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
    it('should not login a user if email is invalid', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send(invalidEmail).end(function (err, res) {
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
    it('should not login a user if password is wrong', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send(wrongPassword).end(function (err, res) {
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
    it('should login a user', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send(loginDetails).end(function (err, res) {
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
  describe('POST/messages', function () {
    it('should create a message', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/messages').send(newMessage).set('x-access-token', userToken).end(function (err, res) {
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
    it('should not create a message if token is not provided', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/messages').end(function (err, res) {
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
  describe('GET /messages', function () {
    it('should return a list of all received messages', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/messages').set('x-access-token', userToken).end(function (err, res) {
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
    it('should not get messages if token is not provided', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/messages').end(function (err, res) {
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
    it('should not get messages if token is wrong', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/messages').set('x-access-token', wrongToken).end(function (err, res) {
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
  describe('GET /messages/sent', function () {
    it('should not get messages if token is not provided', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/messages/sent').end(function (err, res) {
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
    it('should not get messages if token is wrong', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/messages/sent').set('x-access-token', wrongToken).end(function (err, res) {
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
  describe('GET /messages/unread', function () {
    it('should not get messages if token is not provided', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/messages/unread').end(function (err, res) {
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
    it('should not get messages if token is wrong', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/messages/unread').set('x-access-token', wrongToken).end(function (err, res) {
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
  describe('GET /messages/<message-id>', function () {
    it('should not fetch a specific message if token is not provided', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/messages/:id').end(function (err, res) {
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
    it('should not fetch a specific message if token is wrong', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/messages/:id').set('x-access-token', wrongToken).end(function (err, res) {
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
  describe('GET /messages/<message-id>', function () {
    it('should not delete a specific message if token is not provided', function (done) {
      _chai2.default.request(_index2.default).delete('/api/v1/messages/:id').end(function (err, res) {
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
    it('should not delete a specific message if token is wrong', function (done) {
      _chai2.default.request(_index2.default).delete('/api/v1/messages/:id').set('x-access-token', wrongToken).end(function (err, res) {
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
  describe('POST/groups', function () {
    it('should create a group', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/groups').send(newGroup).set('x-access-token', userToken).end(function (err, res) {
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
    it('should not create a group if token is not provided', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/groups').end(function (err, res) {
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
  describe('GET /groups', function () {
    it('should return a list of all the groups', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/groups').set('x-access-token', userToken).end(function (err, res) {
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
    it('should not get groups if token is not provided', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/groups').end(function (err, res) {
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
    it('should not get groups if token is wrong', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/groups').set('x-access-token', wrongToken).end(function (err, res) {
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