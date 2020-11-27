import Authenticate from '../middleware/auth/Authenticate';

export const newUser = {
  email: 'user@gmail.com',
  userName: 'user',
  firstName: 'User',
  lastName: 'Test',
  password: 'password',
};

export const goodUserData = {
  email: 'test@gmail.com',
  userName: 'Test',
  lastName: 'Test',
  firstName: 'User',
  password: 'testing123',
};

export const emptyUserData = {
  email: '',
  username: '',
  lastName: '',
  firstName: '',
  password: '',
};

export const unknownUser = Authenticate.generateToken(
  2000,
  'unknown@mail.com',
  'unknown',
);
export const getUserData = (args) => ({
  ...goodUserData,
  ...args,
});
