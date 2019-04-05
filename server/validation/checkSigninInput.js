import isEmpty from './isEmpty';

const regex = /^[a-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
const checkSigninInput = (data) => {
  const errors = {};
  if (!regex.test(data.email)) {
    errors.email = 'You have entered an invalid email';
  }
  if (isEmpty(data.email)) {
    errors.email = 'Email field is empty';
  }

  if (
    isEmpty(data.password)
    || data.password.length <= 5
  ) {
    errors.password = 'Password must contain a min of 5 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default checkSigninInput;
