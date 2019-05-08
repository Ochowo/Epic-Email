import isEmpty from './isEmpty';

const passwordVal = (data) => {
  const errors = {};
  if (
    isEmpty(data.password)
    || data.password.length <= 5
  ) {
    errors.password = 'Password must contain a min of 5 characters';
  }
  if (isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Please confirm password';
  }
  if (data.password !== data.confirmPassword) {
    errors.password = 'passwords do not match';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default passwordVal;
