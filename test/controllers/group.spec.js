import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../../src/index';
import models from '../../src/models';
import groupController from '../../src/controllers/GroupController';
import GroupMembersController from '../../src/controllers/groupMembersController';

const { expect } = chai;

chai.use(chaiHttp);
chai.use(sinonChai);
chai.use(chaiAsPromised);

const {
  Group, GroupMembers,
} = models;
let token;
let groupId;
const wrongId = '6b2b40d9-1681-426a-aac1-1505ed74da7f';
const wronggId = '6b2b40d9-1681-426a-aac1-1505ed74da7f';
let emptyToken;
let emptyToken3;
let memberId;
let group2Id;
let userId;
afterEach(() => sinon.restore());
describe('Group', () => {
  describe('Create Group', () => {
    it('should sign in a user and save token', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({ email: 'user@gmail.com', password: 'password' })
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

    it('should create a group', (done) => {
      chai
        .request(app)
        .post('/api/v1/groups')
        .set('authorization', token)
        .send({ name: 'group1', description: 'testing123' })
        .end((err, res) => {
          console.log(err, res.body.id, 'ljhk');
          groupId = res.body.data.id;
          console.log(groupId, 'zq');
          expect(res.status).to.be.equal(201);
          expect(res.body)
            .to.have.property('status')
            .equal('success');
          done();
        });
    });
    it('should get all group members', (done) => {
      chai
        .request(app)
        .get(`/api/v1/groups/members/${groupId}`)
        .set('authorization', token)
        .end((err, res) => {
          console.log(res.body, 'xxxxxxxxxxxx');
          expect(res.status).to.be.equal(200);
          expect(res.body)
            .to.have.property('status')
            .equal('success');
          done();
        });
    });
    it('should not create a group if user is not verified', (done) => {
      chai
        .request(app)
        .post('/api/v1/groups')
        .send({ name: 'group1', description: 'testing123' })
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body)
            .to.have.property('message')
            .equal('No Authentication Token Provided');
          done();
        });
    });

    it('should return server error for group controller', async () => {
      const req = { body: { name: 'group1' }, user: { userId: 'f1e2e1c8-6a90-4bcd-b349-49f989d311d6' } };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Group, 'create').throws();
      await groupController.createGroup(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe('Get all groups', () => {
    it('should get all groups', (done) => {
      chai
        .request(app)
        .get('/api/v1/groups')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body)
            .to.have.property('status')
            .equal('success');
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
      sinon.stub(GroupMembers, 'findAll').throws();
      await groupController.getAllGroups(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe('Get a group', () => {
    it('should get a group', (done) => {
      chai
        .request(app)
        .get(`/api/v1/groups/${groupId}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body)
            .to.have.property('status')
            .equal('success');
          done();
        });
    });
    it('should not get an unexisting group', (done) => {
      chai
        .request(app)
        .get(`/api/v1/groups/${wrongId}`)
        .set('authorization', token)
        .end((err, res) => {
          console.log(err, res.body, 'pppp');
          expect(res.status).to.be.equal(404);
          expect(res.body)
            .to.have.property('message')
            .equal('Group not found');
          done();
        });
    });
    it('should return server error for group controller', async () => {
      const req = { params: { id: '7bc8c0fe-9e2a-4a6a-9e11-f6d85b5d8aba' }, user: { userId: 'f1e2e1c8-6a90-4bcd-b349-49f989d311d6' } };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(GroupMembers, 'findOne').throws();
      await groupController.getAGroup(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe('Update a group', () => {
    it('should update a group', (done) => {
      chai
        .request(app)
        .put(`/api/v1/groups/${groupId}`)
        .send({ name: 'sent' })
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body)
            .to.have.property('message')
            .equal('Group updated successfully');
          done();
        });
    });

    it('should not update an unexisting group', (done) => {
      chai
        .request(app)
        .put(`/api/v1/messages/${wrongId}`)
        .send({ name: 'true' })
        .set('authorization', token)
        .end((err, res) => {
          console.log(res.body, 'fffffffffffffffffffffff');
          expect(res.status).to.be.equal(404);
          expect(res.body)
            .to.have.property('status')
            .equal('success');
          done();
        });
    });
    it('should return server error for update group controller', async () => {
      const req = { params: { id: '7bc8c0fe-9e2a-4a6a-9e11-f6d85b5d8aba' }, body: { isdeleted: true }, user: { userId: 'f1e2e1c8-6a90-4bcd-b349-49f989d311d6' } };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();

      sinon.stub(GroupMembers, 'findOne').returnsThis();
      sinon.stub(Group, 'update').throws();
      await groupController.updateGroup(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  describe('Delete a group', () => {
    it('should delete a group', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/groups/${groupId}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body)
            .to.have.property('message')
            .equal('Group deleted successfully');
          done();
        });
    });
    it('should not delete an unexisting group', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/groups/${wrongId}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res.body)
            .to.have.property('message')
            .equal('Group not found');
          done();
        });
    });
    it('should return server error for group controller', async () => {
      const req = { params: { id: '7bc8c0fe-9e2a-4a6a-9e11-f6d85b5d8aba' }, user: { userId: 'f1e2e1c8-6a90-4bcd-b349-49f989d311d6' } };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(GroupMembers, 'findOne').returnsThis();
      sinon.stub(Group, 'destroy').throws();
      await groupController.deleteGroup(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe('Empty group', () => {
    it('should register a user and save token', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'usernn@gmail.com',
          userName: 'user',
          firstName: 'User',
          lastName: 'Test',
          password: 'password',
        })
        .end((err, res) => {
          memberId = res.body.data.user.id;
          console.log(res.body.data.user.id, 'hhhhhhhhhhhhh');
          emptyToken = res.body.data.token;
          expect(res.body.data).to.have.property('token');
          done();
        });
    });
    it('should create a group', (done) => {
      chai
        .request(app)
        .post('/api/v1/groups')
        .set('authorization', token)
        .send({ name: 'group1', description: 'testing123' })
        .end((err, res) => {
          console.log(err, res.body.id, 'ljhk');
          group2Id = res.body.data.id;
          console.log(groupId, 'zq');
          expect(res.status).to.be.equal(201);
          expect(res.body)
            .to.have.property('status')
            .equal('success');
          done();
        });
    });

    it('should create a group member', (done) => {
      chai
        .request(app)
        .post(`/api/v1/groups/members/${group2Id}`)
        .set('authorization', token)
        .send({ userId: memberId })
        .end((err, res) => {
          console.log(group2Id, 'zmq');
          expect(res.status).to.be.equal(201);
          expect(res.body)
            .to.have.property('status')
            .equal('success');
          done();
        });
    });

    it('should not delete a group if user is not an admin', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/groups/${group2Id}`)
        .set('authorization', emptyToken)
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body)
            .to.have.property('status')
            .equal('error');
          done();
        });
    });
    it('should register a user and save token', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'usernnm@gmail.com',
          userName: 'user',
          firstName: 'User',
          lastName: 'Test',
          password: 'password',
        })
        .end((err, res) => {
          emptyToken3 = res.body.data.token;
          console.log(emptyToken3, 'ddddddddddddddddddddddddddddd');
          expect(res.body.data).to.have.property('token');
          done();
        });
    });
    it('should return empty array when there are no groups', (done) => {
      chai
        .request(app)
        .get('/api/v1/groups')
        .set('authorization', emptyToken3)
        .end((err, res) => {
          console.log(token, 'cutiepie', emptyToken, 'cutie');
          expect(res.status).to.be.equal(404);
          expect(res.body)
            .to.have.property('message')
            .equal('Group not found');
          done();
        });
    });
  });
  describe('Group Members', () => {
    it('should return server error for create group member controller', async () => {
      const req = { params: { groupId: '7bc8c0fe-9e2a-4a6a-9e11-f6d85b5d8aba' }, body: { userId: 'f1e2e1c8-6a90-4bcd-b349-49f989d311d6' }, user: { userId: 'f1e2e1c8-6a90-4bcd-b349-49f989d311d6' } };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();

      sinon.stub(GroupMembers, 'findOne').returnsThis();
      sinon.stub(GroupMembers, 'create').throws();
      await GroupMembersController.createGroupMember(req, res);
      console.log(res, 'lllllllllllllllllllllll');
      expect(res.status).to.have.been.calledWith(500);
    });
    it('should create a group member', (done) => {
      chai
        .request(app)
        .post(`/api/v1/groups/members/${group2Id}`)
        .set('authorization', emptyToken3)
        .send({ userId: memberId })
        .end((err, res) => {
          console.log(res.body, 'zmqq');
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });
  describe('Get a group member', () => {
    it('should get a group member', (done) => {
      chai
        .request(app)
        .get(`/api/v1/groups/members/${group2Id}/${memberId}`)
        .set('authorization', token)
        .end((err, res) => {
          console.log(res.body, 'xxxxxxxxxxxx');
          expect(res.status).to.be.equal(200);
          expect(res.body)
            .to.have.property('status')
            .equal('success');
          done();
        });
    });
    it('should not get an unexisting group member', (done) => {
      chai
        .request(app)
        .get(`/api/v1/groups/members/${wrongId}/${memberId}`)
        .set('authorization', token)
        .end((err, res) => {
          console.log(err, res.body, 'pppp');
          expect(res.status).to.be.equal(404);
          expect(res.body)
            .to.have.property('message')
            .equal('Member not found');
          done();
        });
    });
    it('should return server error for get group member controller', async () => {
      const req = { params: { id: '7bc8c0fe-9e2a-4a6a-9e11-f6d85b5d8aba' }, user: { userId: 'f1e2e1c8-6a90-4bcd-b349-49f989d311d6' } };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(GroupMembers, 'findOne').throws();
      await GroupMembersController.getAMember(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe('Get all group members', () => {
    it('should not get unexisting group members', (done) => {
      chai
        .request(app)
        .get(`/api/v1/groups/members/${wronggId}`)
        .set('authorization', token)
        .end((err, res) => {
          console.log(err, res.body, 'wwwwwwwwwwwwwww');
          expect(res.status).to.be.equal(404);
          expect(res.body)
            .to.have.property('message')
            .equal('Members not found');
          done();
        });
    });
    it('should return server error for get all group member controller', async () => {
      const req = { params: { id: '7bc8c0fe-9e2a-4a6a-9e11-f6d85b5d8aba' }, user: { userId: 'f1e2e1c8-6a90-4bcd-b349-49f989d311d6' } };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(GroupMembers, 'findAll').throws();
      await GroupMembersController.getAllGroupMembers(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe('Delete a group member', () => {
    it('should delete a group member', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/groups/members/${group2Id}/${memberId}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          done();
        });
    });
    it('should not delete an unexisting group', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/members/${wrongId}/${memberId}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });
});
