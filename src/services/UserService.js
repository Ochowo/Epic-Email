/* eslint-disable no-useless-catch */
import database from '../models';

const { User, Group, Message } = database;

class UserService {
  static async signup(newUser, email) {
    return User.findOrCreate({
      where: { email },
      defaults: newUser,
    });
  }

  static async getAllUsers(userId) {
    try {
      return await User.findAll({
        include: [
          {
            model: User,
          },
          {
            model: Message,
          },
          {
            model: Group,
          },
        ],
        where: { userId },
      });
    } catch (error) {
      throw (error);
    }
  }

  static findUser(email) {
    return User.findOne({ where: { email } });
  }
}

export default UserService;
