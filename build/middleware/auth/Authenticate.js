"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _response = _interopRequireDefault(require("../../utils/response"));

_dotenv["default"].config();

var response = new _response["default"]();

var Authenticate = /*#__PURE__*/function () {
  function Authenticate() {
    (0, _classCallCheck2["default"])(this, Authenticate);
  }

  (0, _createClass2["default"])(Authenticate, null, [{
    key: "generateToken",

    /**
     * @param  {} id
     * @param  {} email
     */
    value: function generateToken(id, email) {
      var token = _jsonwebtoken["default"].sign({
        userId: id,
        email: email
      }, process.env.SECRET_KEY, {
        expiresIn: '7d'
      });

      return token;
    }
    /**
     * @param  {} req
     * @param  {} res
     * @param  {} next
     */

  }, {
    key: "verifyToken",
    value: function verifyToken(req, res, next) {
      var token = req.headers.authorization;

      if (!token) {
        response.setError(401, 'No Authentication Token Provided');
        return response.send(res);
      }

      _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
          response.setError(403, 'Token not verified');
          return response.send(res);
        }

        var userId = decoded.userId,
            email = decoded.email;
        req.user = {
          userId: userId,
          email: email
        };
        return next();
      });

      return null;
    }
  }]);
  return Authenticate;
}();

var _default = Authenticate;
exports["default"] = _default;