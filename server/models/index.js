import draftQuery from './draft';
import grpMemberQuery from './groupMembers';
import grpMsgQuery from './groupMessages';
import groupQuery from './groups';
import inboxQuery from './inbox';
import msgQuery from './messages';
import sentQuery from './sent';
import userQuery from './users';

const migrate = async () => {
  console.log('heyyy');
  await userQuery();
  await groupQuery();
  await msgQuery();
  await inboxQuery();
  await sentQuery();
  await draftQuery();
  await grpMsgQuery();
  await grpMemberQuery();
};
export {
  migrate,
};

require('make-runnable');
