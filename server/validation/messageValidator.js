import isEmpty from './isEmpty';

const regex = /^[a-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
const messageValidator = (data) => {
  const errors = {};
  if (isEmpty(data.subject)) {
    errors.subject = 'subject field is empty';
  }
  if (isEmpty(data.message)) {
    errors.message = 'message field is empty';
  }
  if (!regex.test(data.receiverEmail)) {
    errors.receiverEmail = 'You have entered an invalid email';
  }
  if (isEmpty(data.receiverEmail)) {
    errors.receiverEmail = 'receiver email field is empty';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default messageValidator;
