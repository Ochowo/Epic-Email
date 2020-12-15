import Response from '../utils/response';
import { userService } from '../services';
import Authenticate from '../middleware/auth/Authenticate';

const response = new Response();

class UserController {
  /**
   * @param  {} req
   * @param  {} res
   */
  static async registerUser(req, res) {
    try {
      const [user, created] = await userService.signup(req.body, req.body.email);
      console.log(user)
      const {
        id, firstName, lastName, email,
      } = user;
      const token = Authenticate.generateToken(id, user.email, user.firstName, user.lastName);
      if (created) {
        const data = {
          user: {
            id,
            firstName,
            lastName,
            email,
          },
          token,
        };
        response.setSuccess(201, 'User created successfully', data);
        return response.send(res);
      }
      response.setError(409, 'User already exist');
      return response.send(res);
    } catch (error) {
      response.setError(500, error.message);
      return response.send(res);
    }
  }

  /**
   * @param  {} req
   * @param  {} res
   */
  static async login(req, res) {
    const {
      email, password,
    } = req.body;
    const user = await userService.getAUser(email);
    console.log(user);
    if (!user) {
      console.log('noooooooooooooo');
      response.setError(404, 'User does not exist');
      return response.send(res);
    }
    if (user.comparePassword(password, user)) {
      const token = Authenticate.generateToken(user.id, user.email, user.firstName, user.lastName);
      const data = { user, token };
      response.setSuccess(200, 'Login successful', data);
      return response.send(res);
    }
    response.setError(401, 'Invalid credentials');
    return response.send(res);
  }

  static async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      console.log(users, 'afh');
      if (users.length < 1) {
        response.setSuccess(404, 'Users not found');
      } else {
        response.setSuccess(200, null, users);
      }
      return response.send(res);
    } catch (error) {
      response.setError(500, error);
      return response.send(res);
    }
  }

  static async getAUser(req, res) {
    console.log('here again')
    const { email } = req.query;
    console.log(email, req.query)
    try {
      const users = await userService.getAUser(email);
      console.log(users, 'afh');
      if (!users) {
        response.setSuccess(404, 'User not found');
      } else {
        response.setSuccess(200, null, users);
      }
      return response.send(res);
    } catch (error) {
      console.log(error)
      response.setError(500, error);
      return response.send(res);
    }
  }
}

export default UserController;
