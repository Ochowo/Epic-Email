export const newMessage = {
  receiverEmail: 'harubebe@gmail.com',
  body: 'Hello',
  subject: 'Greetings',

};
export const emptyMessageData = {};

export const goodMessageData = {
  receiverEmail: 'harubebe@gmail.com',
  body: 'Hello',
  subject: 'Greetings',
};

export const getMessageData = (article, args) => ({
  ...goodMessageData,
  ...args,
});
