/* eslint-disable no-useless-catch */
import database from '../models';

const { Content } = database;
class ContentService {
  static async getAllContent() {
    try {
      return await Content.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async createContent(newContent) {
    try {
      return await Content.create(newContent);
    } catch (error) {
      throw error;
    }
  }

  static async updateContent(id, updateContent) {
    try {
      const contentToUpdate = await Content.findOne({
        where: { id },
      });
      if (contentToUpdate) {
        await Content.update(updateContent, { where: { id } });

        return updateContent;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAContent(id) {
    try {
      return await await Content.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  static async deleteMessage(id) {
    try {
      return await Content.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}

export default ContentService;
