import isEmpty from './isEmpty';

const regex = /^[a-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
const grpValidator = (data) => {
  const errors = {};
  if (isEmpty(data.subject)) {
    errors.subject = 'subject field is empty';
  }
  if (isEmpty(data.message)) {
    errors.message = 'message field is empty';
  }
  return {
    errors,
    Valid: isEmpty(errors),
  };
};

export default grpValidator;
