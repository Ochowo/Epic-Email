import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authHelper = {

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  generateToken(id, email) {
    const token = jwt.sign({
      // eslint-disable-next-line object-shorthand
      userId: id, email: email,
    },
    process.env.SECRET, {
      expiresIn: 86400,
    });
    return token;
  },

};

export default authHelper;
