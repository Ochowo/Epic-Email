import isEmpty from './isEmpty';
import isIncorrect from './isIncorrect';

const statusValidator = (data) => {
  const error = {};

  if (!isIncorrect(data.status)) {
    error.status = 'incorrect status format';
  }

  return {
    error,
    isVeryValid: isEmpty(error),
  };
};

export default statusValidator;
