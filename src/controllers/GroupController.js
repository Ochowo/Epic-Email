import Response from '../utils/response';
import { groupService, groupMemberService } from '../services';

const response = new Response();

class GroupController {
  static async createGroup(req, res) {
    const {
      userId,
    } = req.user;
    const {
      name,
      description,

    } = req.body;
    const newGroup = {
      name,
      description,
    };

    try {
      console.log('xz');
      const createGroup = await groupService.createGroup(newGroup);

      const newMember = {
        UserId: userId,
        GroupId: createGroup.dataValues.id,
        isAdmin: true,
      };
      console.log(newMember);
      const ggr = await groupMemberService.createGroupMembers(newMember);
      console.log(ggr)
      if (ggr.dataValues != null) {
        response.setSuccess(201, 'success', createGroup.dataValues);
      }

      return response.send(res);
    } catch (error) {
      response.setError(500, error.message);
      return response.send(res);
    }
  }

  static async getAllGroups(req, res) {
    const { userId } = req.user;
    try {
      const grps = await groupService.getAllGroups(userId);
      if (grps.length < 1) {
        response.setSuccess(404, 'Group not found');
      } else {
        const groupArr = [];
        const grr = grps.map((grp) => {
          groupArr.push(grp.Group.dataValues);
          return groupArr;
        });
        response.setSuccess(200, null, grr);
      }
      return response.send(res);
    } catch (error) {
      response.setError(500, error);
      return response.send(res);
    }
  }

  static async getAGroup(req, res) {
    const { id } = req.params;
    const { userId } = req.user;
    try {
      const grp = await groupService.getAGroup(id, userId);
      if (!grp) {
        response.setSuccess(404, 'Group not found');
      } else {
        const group = grp.dataValues;
        response.setSuccess(200, null, group);
      }
      return response.send(res);
    } catch (error) {
      console.log(error, 'epp');
      response.setError(500, error);
      return response.send(res);
    }
  }

  static async updateGroup(req, res) {
    console.log('ooooooooooooooooooooooooooooooooooooooooooooooo');
    const { id } = req.params;
    const { userId } = req.user;
    try {
      const grp = await groupService.getAGroup(id, userId);
      console.log(grp, 'eeeeeeeeeeeeeeeeeeeeeee');
      if (!grp) {
        response.setSuccess(404, 'Group not found');
      } else {
        const updated = await groupService.updateGroup(id, req.body);
        console.log(updated, 'ffff');

        if (updated) {
          response.setSuccess(200, 'Group updated successfully', req.body);
          return response.send(res);
        }
      }

      return response.send(res);
    } catch (error) {
      response.setError(500, error);
      return response.send(res);
    }
  }

  static async deleteGroup(req, res) {
    console.log('deleer');
    const { id } = req.params;
    const { userId } = req.user;
    const adminUser = await groupMemberService.getAMember(id, userId);
    console.log(adminUser, 'usrrrrrrrrrrrrrrrrrrr');
    try {
      if (adminUser) {
        const { isAdmin } = adminUser.dataValues;
        if (!isAdmin) {
          response.setError(401, 'Only an an admin can delete a group');
          return response.send(res);
        }
        await groupService.deleteGroup(id);
        response.setSuccess(200, 'Group deleted successfully');
        return response.send(res);
      }

      response.setSuccess(404, 'Group not found');
      return response.send(res);
    } catch (error) {
      response.setError(500, error);
      return response.send(res);
    }
  }
}

export default GroupController;
