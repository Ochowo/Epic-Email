"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _response = _interopRequireDefault(require("../utils/response"));

var _services = require("../services");

var _Authenticate = _interopRequireDefault(require("../middleware/auth/Authenticate"));

var response = new _response["default"]();

var UserController = /*#__PURE__*/function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, null, [{
    key: "registerUser",

    /**
     * @param  {} req
     * @param  {} res
     */
    value: function () {
      var _registerUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _yield$userService$si, _yield$userService$si2, user, created, id, firstName, lastName, email, token, data;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _services.userService.signup(req.body, req.body.email);

              case 3:
                _yield$userService$si = _context.sent;
                _yield$userService$si2 = (0, _slicedToArray2["default"])(_yield$userService$si, 2);
                user = _yield$userService$si2[0];
                created = _yield$userService$si2[1];
                id = user.id, firstName = user.firstName, lastName = user.lastName, email = user.email;
                token = _Authenticate["default"].generateToken(id, user.email);

                if (!created) {
                  _context.next = 13;
                  break;
                }

                data = {
                  user: {
                    id: id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                  },
                  token: token
                };
                response.setSuccess(201, 'User created successfully', data);
                return _context.abrupt("return", response.send(res));

              case 13:
                response.setError(409, 'User already exist');
                return _context.abrupt("return", response.send(res));

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](0);
                response.setError(500, _context.t0.message);
                return _context.abrupt("return", response.send(res));

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 17]]);
      }));

      function registerUser(_x, _x2) {
        return _registerUser.apply(this, arguments);
      }

      return registerUser;
    }()
    /**
     * @param  {} req
     * @param  {} res
     */

  }, {
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$body, email, password, user, token, data;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, password = _req$body.password;
                _context2.next = 3;
                return _services.userService.findUser(email);

              case 3:
                user = _context2.sent;
                console.log(user);

                if (user) {
                  _context2.next = 9;
                  break;
                }

                console.log('noooooooooooooo');
                response.setError(404, 'User does not exist');
                return _context2.abrupt("return", response.send(res));

              case 9:
                if (!user.comparePassword(password, user)) {
                  _context2.next = 14;
                  break;
                }

                token = _Authenticate["default"].generateToken(user.id, user.email);
                data = {
                  user: user,
                  token: token
                };
                response.setSuccess(200, 'Login successful', data);
                return _context2.abrupt("return", response.send(res));

              case 14:
                response.setError(401, 'Invalid credentials');
                return _context2.abrupt("return", response.send(res));

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function login(_x3, _x4) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }]);
  return UserController;
}();

var _default = UserController;
exports["default"] = _default;