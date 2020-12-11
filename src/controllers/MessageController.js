import Response from '../utils/response';
import { messageService, userService, contentService } from '../services';

const response = new Response();
class MessageController {
  static async getAMessage(req, res) {
    console.log('herme');
    const { userId } = req.user;
    const { id } = req.params;
    try {
      const msg = await messageService.getAMessage(userId, id);
      if (!msg) {
        console.log('uuu');
        response.setSuccess(404, 'Message not found');
      } else {
        console.log('pppppj');
        response.setSuccess(200, null, msg);
      }
      return response.send(res);
    } catch (error) {
      console.log(error, 'pppm');
      response.setError(500, error);
      return response.send(res);
    }
  }

  static async getAllMessages(req, res) {
    
    const { userId } = req.user;
    try {
      const messages = await messageService.getAllMessages(userId);
      console.log(messages, 'afh');
      if (messages.length < 1) {
        response.setSuccess(404, 'Message not found');
      } else {
        response.setSuccess(200, null, messages);
      }
      return response.send(res);
    } catch (error) {
      response.setError(500, error);
      return response.send(res);
    }
  }

  static async getMessageByFolder(req, res) {
    console.log('hhh');
    console.log(req.user, 'pulse');
    const { userId } = req.user;
    const { name } = req.query;
    try {
      const msgs = await messageService.getMessageByFolder(userId, name);
      if (msgs.length < 1) {
        console.log('naaaa');
        response.setSuccess(404, 'Message not found');
      } else {
        response.setSuccess(200, null, msgs);
      }
      return response.send(res);
    } catch (error) {
      response.setError(500, error);
      return response.send(res);
    }
  }

  static async sendDraft(req, res) {
    const { userId } = req.user;
    const { id } = req.params;
    try {
      const msg = await messageService.getAMessage(userId, id);
      console.log(msg, 'cv');
      if (!msg) {
        response.setSuccess(404, 'Message not found');
      }
      const msgContent = msg.dataValues.Content.dataValues;
      const contentId = msgContent.id;
      const {
        subject,
        body,
        groupId,
        receiverEmail,
        attatchments,
      } = req.body;
      const receiver = receiverEmail != null ? receiverEmail.toString() : null;
      const contentBody = {
        receiverEmail: receiverEmail != null ? receiver : msgContent.receiverEmail,
        subject: subject != null ? subject : msgContent.subject,
        body: body != null ? body : msgContent.body,
        attatchments: attatchments != null ? attatchments : msgContent.attatchments,

      };
      const sentMessageBody = {
        folderName: 'sent',
        groupId: groupId != null ? groupId : msgContent.groupId,
        contentId,
      };
      const inboxMessage = {
        folderName: 'inbox',
        groupId: groupId != null ? groupId : msgContent.groupId,
        contentId,
        replyId: null,
        parentId: null,
        isread: false,
      };
      console.log(msgContent, sentMessageBody.parentId, 'pareentsss');
      const message = await messageService.updateMessage(userId, id, sentMessageBody);
      const contentCreation = await contentService.updateContent(contentId, contentBody);
      if (message && contentCreation) {
        console.log(msgContent, 'done');
        const emailArr = receiverEmail != null ? receiver : contentBody.receiverEmail.split(',');
        const promises = emailArr.map((e) => {
          const newEmail = userService.findUser(e);
          return newEmail;
        });
        console.log(promises, 'prom');
        const idArray = [];
        const specificUsers = await Promise.all(promises);
        specificUsers.map((el) => {
          idArray.push(el.dataValues.id);

          return idArray;
        });
        const createInbox = idArray.map((ms) => {
          sentMessageBody.userId = ms;
          const sendMsg = messageService.createMessage(inboxMessage);
          return sendMsg;
        });
        await Promise.all(createInbox);
        response.setSuccess(200, 'Message sent successfully');
      } return response.send(res);
    } catch (error) {
      console.log(error);
      response.setError(500, error.message);
      return response.send(res);
    }
  }

  static async createMessage(req, res) {
    console.log(req.user, 'pol');
    const { userId, email } = req.user;
    const {
      subject,
      body,
      replyId,
      parentId,
      groupId,
      receiverEmail,
      attatchments,
    } = req.body;
    const receiver = receiverEmail.toString();
    const contentBody = {
      senderEmail: email,
      receiverEmail: receiver,
      subject,
      body,
      attatchments,

    };
    try {
      const createContent = await contentService.createContent(contentBody);
      const contentId = createContent.id;
      const { type } = req.query;
      const sentMessageBody = {
        parentId,
        replyId,
        userId,
        contentId,
        folderName: type,
        isread: true,
        groupId,
      };

      if (receiverEmail.length > 0) {
        sentMessageBody.parentId = parentId != null ? parentId : null;
        sentMessageBody.replyId = replyId != null ? replyId : null;
        sentMessageBody.groupId = groupId != null ? groupId : null;
        const msgg = await messageService.createMessage(sentMessageBody);
        console.log(msgg, 'msgf');
        const idArray = [];
        if (type === 'sent') {
          sentMessageBody.folderName = 'inbox';
          sentMessageBody.isread = false;
          if (receiverEmail.length > 0) {
            const promises = receiverEmail.map((e) => {
              const newEmail = userService.findUser(e);
              return newEmail;
            });

            const specificUsers = await Promise.all(promises);
            specificUsers.map((el) => {
              idArray.push(el.dataValues.id);

              return idArray;
            });
            const createInbox = idArray.map((msg) => {
              sentMessageBody.userId = msg;
              const sendMsg = messageService.createMessage(sentMessageBody);
              return sendMsg;
            });
            console.log(msgg, 'msg');
            await Promise.all(createInbox);
            response.setSuccess(201, 'Message sent successfully', msgg.dataValues);
          }
        }
        if (type === 'draft') {
          response.setSuccess(201, 'Message sent successfully', msgg.dataValues);
        }
      }
      return response.send(res);
    } catch (error) {
      console.log(error);
      response.setError(500, error.message);
      return response.send(res);
    }
  }

  static async updateMessage(req, res) {
    const { userId } = req.user;
    const { id } = req.params;
    try {
      const msggg = await messageService.getAMessage(userId, id);

      if (!msggg) {
        response.setSuccess(404, 'Message not found');
        return response.send(res);
      }
      await messageService.updateMessage(userId, id, req.body);
      response.setSuccess(200, 'Message updated successfully', req.body);
      return response.send(res);
    } catch (error) {
      response.setError(500, error);
      return response.send(res);
    }
  }

  static async deleteMessage(req, res) {
    const { userId } = req.user;
    const { id } = req.params;
    try {
      const deleted = await messageService.deleteMessage(userId, id);
      console.log(deleted, 'deleted');
      if (deleted) {
        response.setSuccess(200, 'Message deleted successfully');
        return response.send(res);
      }

      response.setSuccess(404, 'Message not found');

      return response.send(res);
    } catch (error) {
      response.setError(500, error);
      return response.send(res);
    }
  }
}

export default MessageController;
