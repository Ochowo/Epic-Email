import Response from '../utils/response';
import { groupMemberService } from '../services';

const response = new Response();

class GroupMembersController {
  static async createGroupMember(req, res) {
    try {
      const {
        userId,
      } = req.body;
      const reqUser = req.user.userId;
      const { groupId } = req.params;
      const grp = await groupMemberService.getAMember(groupId, reqUser);
      if (!grp) {
        response.setSuccess(404, 'Member not found');
      } else {
        const member = { UserId: userId, GroupId: groupId };
        const createMembers = await groupMemberService.createGroupMembers(member);
        response.setSuccess(201, 'success', createMembers);
      }
      return response.send(res);
    } catch (error) {
      response.setError(500, error);
      return response.send(res);
    }
  }

  static async getAMember(req, res) {
    const { groupId, userId } = req.params;
    try {
      const grp = await groupMemberService.getAMember(groupId, userId);
      if (!grp) {
        response.setSuccess(404, 'Member not found');
      } else {
        console.log(grp, 'cccccccccccc')
        const groupMember = grp.dataValues;
        response.setSuccess(200, null, groupMember);
      }
      return response.send(res);
    } catch (error) {
      response.setError(500, error);
      return response.send(res);
    }
  }

  static async getAllGroupMembers(req, res) {
    const { groupId } = req.params;
    const { userId } = req.user;
    try {
      console.log(groupId, userId)
      const grps = await groupMemberService.getAllGroupMembers(userId, groupId);
      console.log(grps, 'eeeeeeeeeeeeeeeeeeee')
      if (grps.length === 0) {
        response.setSuccess(404, 'Members not found');
      } else {
        response.setSuccess(200, null, grps);
      }
      return response.send(res);
    } catch (error) {
      response.setError(500, error);
      return response.send(res);
    }
  }

  //   static async updateGroup(req, res) {
  //     const { id } = req.params;
  //     try {
  //       const [updated] = await groupService.updateGroup(req.body, id);
  //       if (updated) {
  //         groupService.getAGroup(id);
  //         response.setSuccess(200, 'success', updated);
  //         return response.send(res);
  //       }

  //       response.setSuccess(404, 'Group not found');

  //       return response.send(res);
  //     } catch (error) {
  //       response.setError(500, error);
  //       return response.send(res);
  //     }
  //   }

  static async deleteMember(req, res) {
    const { groupId } = req.params;
    const { userId } = req.user;
    const adminUser = await groupMemberService.getAMember(groupId, userId);
    console.log(adminUser, 'hhhhhhhhhhhhhh')
    const { isAdmin } = adminUser.dataValues;
    const id = adminUser.dataValues.userId;
    if (!isAdmin) {
      response.setError(401, 'Only an admin can delete a group member');
    }
    try {
      const deleted = await groupMemberService.deleteGroupMember(groupId, userId);
      if (deleted) {
        response.setSuccess(200, 'success');
        return response.send(res);
      }

      response.setSuccess(404, 'Member not found');

      return response.send(res);
    } catch (error) {
      console.log(error, 'vvvvvvvvvv')
      response.setError(500, error);
      return response.send(res);
    }
  }
}

export default GroupMembersController;
