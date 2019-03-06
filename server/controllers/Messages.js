import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import messages from '../db/messages';

dotenv.config();

class Messages {
  static newMessage(req, res) {
    // Check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET);
    const message = {
      id: messages.length + 1,
      createdOn: new Date().toDateString(),
      subject: req.body.subject,
      message: req.body.message,
      parentMessageId: decoded.userId,
      status: req.body.status,
    };
    messages.push(message);
    return res.status(201).json({
      status: 201,
      data: [{
        message,
      }],
    });
  }
}
export default Messages;
