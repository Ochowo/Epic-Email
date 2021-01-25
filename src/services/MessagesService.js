/* eslint-disable no-useless-catch */
import database from '../models';
import { getPagination, getPagingData } from '../utils/paginationUtil';

const { Message, Content, User } = database;

class MessageService {
  static async getAllMessages(userId, page, size) {
    const { limit, offset } = getPagination(page, size);

    try {
      return await Message.findAndCountAll({
        include: [
          {
            model: User,
          },
          {
            model: Content,
          },
        ],
        where: { userId },
        limit,
        offset,
        order: [
          ['createdAt', 'DESC'],
        ],
      });
    } catch (error) {
      throw (error);
    }
  }

  static async getMessageByFolder(userId, folderName, page, size) {
    const { limit, offset } = getPagination(page, size);

    try {
      return Message.findAndCountAll({
        include: [
          {
            model: Content,
          },
          {
            model: User,
          },
        ],
        where: { userId, folderName },
        limit,
        offset,
        order: [
          ['createdAt', 'DESC'],
        ],
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
