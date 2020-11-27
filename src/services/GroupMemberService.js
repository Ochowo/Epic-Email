/* eslint-disable no-useless-catch */
import database from '../models';

const {
  User, GroupMembers, Group,
} = database;

class GroupMemberService {
  static async getAllGroupMembers(userId, groupId) {
    try {
      return await GroupMembers.findAll({
        include: [
          {
            model: User,
          },
          {
            model: Group,
          },
        ],
        where: { GroupId: groupId, UserId: userId },
      });
    } catch (error) {
      throw (error);
    }
  }

  static async createGroupMembers(newGroupMember) {
    try {
      return GroupMembers.create(newGroupMember);
    } catch (error) {
      throw (error);
    }
  }

  //   static async updateGroup(id, updateGroup) {
  //     try {
  //       return Group.update(updateGroup, { where: { id } });
  //     } catch (error) {
  //       throw (error);
  //     }
  //   }

  static async getAMember(groupId, userId) {
    try {
      return GroupMembers.findOne({
        include: [
          {
            model: User,
          },
        ],
        where: { GroupId: groupId, UserId: userId },
      });
    } catch (error) {
      throw (error);
    }
  }

  static async deleteGroupMember(groupId, userId) {
    try {
      return GroupMembers.destroy({ where: { GroupId: groupId, UserId: userId } });
    } catch (error) {
      throw (error);
    }
  }
}

export default GroupMemberService;
