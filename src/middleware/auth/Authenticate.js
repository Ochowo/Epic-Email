import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Response from '../../utils/response';

dotenv.config();
const response = new Response();

class Authenticate {
  /**
   * @param  {} id
   * @param  {} email
   */
  static generateToken(id, email) {
    const token = jwt.sign(
      {
        userId: id, email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '7d',
      },
    );
    return token;
  }

  /**
   * @param  {} req
   * @param  {} res
   * @param  {} next
   */
  static verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      response.setError(401, 'No Authentication Token Provided');
      return response.send(res);
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        response.setError(403, 'Token not verified');
        return response.send(res);
      }
      const { userId, email } = decoded;
      req.user = { userId, email };
      return next();
    });
    return null;
  }
}

export default Authenticate;
