/* eslint-disable no-useless-catch */
import database from '../models';

const {
  Group, GroupMembers, User,
} = database;

class GroupService {
  static async getAllGroups(userId) {
    try {
      return await GroupMembers.findAll({
        include: [
          {
            model: Group,
          },
        ],
        where: { UserId: userId },
      });
    } catch (error) {
      throw (error);
    }
  }

  static async createGroup(newGroup) {
    try {
      return Group.create(newGroup);
    } catch (error) {
      throw (error);
    }
  }

  static async updateGroup(id, updateGroup) {
    try {
      return Group.update(updateGroup, { where: { id } });
    } catch (error) {
      throw (error);
    }
  }

  static async getAGroup(id, userId) {
    try {
      return GroupMembers.findOne({
        include: [
          {
            model: Group,
          },
          {
            model: User,
          },
        ],
        where: { GroupId: id, UserId: userId },
      });
    } catch (error) {
      console.log(error);
      throw (error);
    }
  }

  static async deleteGroup(id) {
    try {
      return Group.destroy({ where: { id } });
    } catch (error) {
      throw (error);
    }
  }
}

export default GroupService;
