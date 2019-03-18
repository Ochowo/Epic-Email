import isEmpty from './isEmpty';

const messageValidator = (data) => {
  const errors = {};
  if (isEmpty(data.name)) {
    errors.name = 'name field is empty';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default messageValidator;
