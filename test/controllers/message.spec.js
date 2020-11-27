import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../../src/index';
import models from '../../src/models';
import messageController from '../../src/controllers/MessageController';

const { expect } = chai;

chai.use(chaiHttp);
chai.use(sinonChai);
chai.use(chaiAsPromised);

const {
  Message,
} = models;
let token;
let messageId;
const wrongId = '6bc8c0fe-9e2a-4a6a-9e11-f6d85b5d8aba';
const wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
let draftId;
let emptyToken;
afterEach(() => sinon.restore());
describe('Message', () => {
  describe('Create message', () => {
    it('should sign in a user and save token', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({ email: 'test@gmail.com', password: 'testing123' })
        .end((err, res) => {
          token = res.body.data.token;
          expect(res.status).to.be.equal(200);
          expect(res).to.be.an('object');
          expect(res.body.data).to.have.property('token');
          expect(res.body)
            .to.have.property('message')
            .equal('Login successful');
          done();
        });
    });
    it('should register a user and save token', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'user@gmail.com',
          userName: 'user',
          firstName: 'User',
          lastName: 'Test',
          password: 'password',
        })
        .end((err, res) => {
          emptyToken = res.body.data.token;
          expect(res.body.data).to.have.property('token');
          done();
        });
    });
    it('should create a message', (done) => {
      chai
        .request(app)
        .post('/api/v1/messages?type=sent')
        .set('authorization', token)
        .send({ receiverEmail: ['test@gmail.com'], body: 'testing123' })
        .end((err, res) => {
          messageId = res.body.data.id;
          expect(res.status).to.be.equal(201);
          expect(res.body)
            .to.have.property('message')
            .equal('Message sent successfully');
          done();
        });
    });
    it('should create a draft message', (done) => {
      chai
        .request(app)
        .post('/api/v1/messages?type=draft')
        .set('authorization', token)
        .send({ receiverEmail: ['test@gmail.com'], body: 'testing123' })
        .end((err, res) => {
          draftId = res.body.data.id;
          done();
        });
    });
    it('should not create a message if user is not verified', (done) => {
      chai
        .request(app)
        .post('/api/v1/messages?type=sent')
        .send({ receiverEmail: ['test@gmail.com'], body: 'testing123' })
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body)
            .to.have.property('message')
            .equal('No Authentication Token Provided');
          done();
        });
    });
    it('should not create a message if token is wrong', (done) => {
      chai
        .request(app)
        .post('/api/v1/messages?type=sent')
        .set('authorization', wrongToken)
        .send({ receiverEmail: ['test@gmail.com'], body: 'testing123' })
        .end((err, res) => {
          expect(res.status).to.be.equal(403);
          expect(res.body)
            .to.have.property('message')
            .equal('Token not verified');
          done();
        });
    });
    it('should return server error for message controller', async () => {
      const req = { body: { receiverEmail: ['test@gmail.com'] }, user: { userId: 'f1e2e1c8-6a90-4bcd-b349-49f989d311d6' } };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Message, 'create').throws();
      await messageController.createMessage(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe('Get all messages', () => {
    it('should get all messages', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body)
            .to.have.property('status')
            .equal('success');
          done();
        });
    });
    it('should return empty array when there are no messages', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages')
        .set('authorization', emptyToken)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res.body)
            .to.have.property('status')
            .equal('success');
          done();
        });
    });

    it('should not get all messages if user is not verified', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages')
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body)
            .to.have.property('message')
            .equal('No Authentication Token Provided');
          done();
        });
    });

    it('should return server error for message controller', async () => {
      const req = { user: { userId: 'f1e2e1c8-6a90-4bcd-b349-49f989d311d6' } };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Message, 'findAll').throws();
      await messageController.getAllMessages(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe('Get a message', () => {
    it('should get a message', (done) => {
      chai
        .request(app)
        .get(`/api/v1/messages/${messageId}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body)
            .to.have.property('status')
            .equal('success');
          done();
        });
    });
    it('should not get an unexisting message', (done) => {
      chai
        .request(app)
        .get(`/api/v1/messages/${wrongId}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res.body)
            .to.have.property('message')
            .equal('Message not found');
          done();
        });
    });
    it('should not get a message if user is not verified', (done) => {
      chai
        .request(app)
        .get(`/api/v1/messages/${messageId}`)
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body)
            .to.have.property('message')
            .equal('No Authentication Token Provided');
          done();
        });
    });

    it('should return server error for message controller', async () => {
      const req = { params: { id: '7bc8c0fe-9e2a-4a6a-9e11-f6d85b5d8aba' }, user: { userId: 'f1e2e1c8-6a90-4bcd-b349-49f989d311d6' } };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Message, 'findOne').throws();
      await messageController.getAMessage(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe('Get a message by folder', () => {
    it('should get a message by folder', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages/folder?name=sent')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body)
            .to.have.property('status')
            .equal('success');
          done();
        });
    });
    it('should return empty array when there are no messages', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages/folder?name=sent')
        .set('authorization', emptyToken)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res.body)
            .to.have.property('status')
            .equal('success');
          done();
        });
    });
    it('should not get a message by folder if user is not verified', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages/folder?name=sent')
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body)
            .to.have.property('message')
            .equal('No Authentication Token Provided');
          done();
        });
    });

    it('should return server error for message controller', async () => {
      const req = { params: { id: '7bc8c0fe-9e2a-4a6a-9e11-f6d85b5d8aba' }, user: { userId: 'f1e2e1c8-6a90-4bcd-b349-49f989d311d6' }, query: { name: 'sent' } };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Message, 'findAll').throws();
      await messageController.getMessageByFolder(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe('Update a message', () => {
    it('should send a draft message', (done) => {
      chai
        .request(app)
        .put(`/api/v1/messages/draft/${draftId}`)
        .send({ folderName: 'sent' })
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body)
            .to.have.property('message')
            .equal('Message sent successfully');
          done();
        });
    });
    it('should update a message', (done) => {
      chai
        .request(app)
        .put(`/api/v1/messages/${messageId}`)
        .send({ isdeleted: true })
        .set('authorization', token)
        .end((err, res) => {
          console.log(res);
          expect(res.status).to.be.equal(200);
          expect(res.body)
            .to.have.property('status')
            .equal('success');
          done();
        });
    });
    it('should not update an unexisting message', (done) => {
      chai
        .request(app)
        .put(`/api/v1/messages/${wrongId}`)
        .send({ isdeleted: true })
        .set('authorization', token)
        .end((err, res) => {
          console.log(res.body, 'lklk');
          expect(res.status).to.be.equal(404);
          expect(res.body)
            .to.have.property('status')
            .equal('success');
          done();
        });
    });
    it('should not update a message if user is not verified', (done) => {
      chai
        .request(app)
        .put(`/api/v1/messages/draft/${messageId}`)
        .send({ body: 'test' })
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body)
            .to.have.property('message')
            .equal('No Authentication Token Provided');
          done();
        });
    });

    it('should return server error for draft message controller', async () => {
      const req = { params: { id: '7bc8c0fe-9e2a-4a6a-9e11-f6d85b5d8aba' }, body: { body: 'test' }, user: { userId: 'f1e2e1c8-6a90-4bcd-b349-49f989d311d6' } };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Message, 'update').throws();
      await messageController.sendDraft(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
    it('should return server error for update message controller', async () => {
      const req = { params: { id: '7bc8c0fe-9e2a-4a6a-9e11-f6d85b5d8aba' }, body: { isdeleted: true }, user: { userId: 'f1e2e1c8-6a90-4bcd-b349-49f989d311d6' } };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();

      sinon.stub(Message, 'findOne').returnsThis();
      sinon.stub(Message, 'update').throws();
      await messageController.updateMessage(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe('Delete a message', () => {
    it('should not delete a message if user is not verified', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/messages/${messageId}`)
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body)
            .to.have.property('message')
            .equal('No Authentication Token Provided');
          done();
        });
    });
    it('should delete a message', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/messages/${messageId}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body)
            .to.have.property('message')
            .equal('Message deleted successfully');
          done();
        });
    });
    it('should not delete an unexisting message', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/messages/${wrongId}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res.body)
            .to.have.property('message')
            .equal('Message not found');
          done();
        });
    });
    it('should return server error for message controller', async () => {
      const req = { params: { id: '7bc8c0fe-9e2a-4a6a-9e11-f6d85b5d8aba' }, user: { userId: 'f1e2e1c8-6a90-4bcd-b349-49f989d311d6' } };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Message, 'destroy').throws();
      await messageController.deleteMessage(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
