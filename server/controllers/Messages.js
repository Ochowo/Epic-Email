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
      parentMessageId:req.body.parentMessageId,
      status: req.body.status,
      email:decoded.email,
      senderId: decoded.userId,
      receiverId: req.body.receiverId,
    };
    messages.push(message);
    return res.status(201).json({
      status: 201,
      data: [{
        message,
      }],
    });
  }
  static getAllMessages(req, res){
    // Check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET);
    const result = messages.filter(user => user.email === decoded.email);
    if(result < 1){ 
      return res.status(401).json({
        status: 401,
        error: 'No messages for this user',
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        result,
      },
    });
  }
  static getUnread (req, res){
    // Check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET);
    const result = messages.filter(user => user.email === decoded.email);
    const result2 = result.filter(msg => (msg.status !== 'read' && msg.status !== 'sent'));
    if(result < 1){ 
      return res.status(401).json({
        status: 401,
        error: 'No messages for this user',
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        result2,
      },
    });
  }
  static getSent (req, res){
    // Check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET);
    const result = messages.filter(user => user.email === decoded.email);
    const result2 = result.filter(msg => (msg.status === 'sent'));
    if(result < 1){ 
      return res.status(401).json({
        status: 401,
        error: 'No messages for this user',
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        result2,
      },
    });
  }
  static getSpecificEmail(req, res){
    // Check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET);
    const result = messages.filter(user => user.email === decoded.email);
    const mail = messages.find(c => c.id === parseInt((req.params.id), 10));
    if(result < 1){ 
      return res.status(401).json({
        status: 401,
        error: 'No message for this user',
      });
    }
    if(!mail){
      return res.status(404).json({
        status: 404,
        error: `message with id = ${req.params.id} not found for this user`,
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        mail,
      },
    });
  }
  static deleteEmail(req, res){
    // Check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET);
    const result = messages.filter(user => user.email === decoded.email);
    const mail = messages.find(c => c.id === parseInt((req.params.id), 10));
    const index = messages.indexOf(mail);
    if(result < 1){ 
      return res.status(401).json({
        status: 401,
        error: 'No message for this user',
      });
    }
    if(!mail){
      return res.status(404).json({
        status: 404,
        error: `message with id = ${req.params.id} not found for this user`,
      });
    }
    messages.splice(index, 1);
    return res.status(200).json({
      status: 200,
      data: {
       message: 'email deleted succesfully',
      },
    });
  }
  
}
export default Messages;
