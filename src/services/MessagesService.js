/* eslint-disable no-useless-catch */
import database from '../models';

const { Message, Content, User } = database;

class MessageService {
  static async getAllMessages(userId) {
    try {
      return await Message.findAll({
        include: [
          {
            model: User,
          },
          {
            model: Content,
          },
        ],
        where: { userId },
      });
    } catch (error) {
      throw (error);
    }
  }

  static async getMessageByFolder(userId, folderName) {
    try {
      return Message.findAll({
        include: [
          {
            model: Content,
          },
          {
            model: User,
          },
        ],
        where: { userId, folderName },
      });
    } catch (error) {
      console.log(error, 'error');
      throw (error);
    }
  }

  static async createMessage(newMessage) {
    try {
      return Message.create(newMessage);
    } catch (error) {
      throw (error);
    }
  }

  static async updateMessage(userId, id, updateMessage) {
    try {
      return Message.update(updateMessage, { where: { userId, id } });
    } catch (error) {
      throw (error);
    }
  }

  static async getAMessage(userId, id) {
    try {
      return Message.findOne({
        include: [
          {
            model: Content,
          },
          {
            model: User,
          },
        ],
        where: { id },
      });
    } catch (error) {
      throw (error);
    }
  }

  static async deleteMessage(userId, id) {
    try {
      return Message.destroy({ where: { userId, id } });
    } catch (error) {
      throw (error);
    }
  }
}

export default MessageService;
