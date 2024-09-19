const ValidateJWT = require('./validateJWTMiddleware');
const ValidateRoles = require('./validateRolMiddleware');
const ValidateCampos = require('./validaFieldsMiddleware');
const AuthMiddleware = require('./authMiddleware');

module.exports = {
  ...ValidateCampos,
  ...ValidateJWT,
  ...ValidateRoles,
  ...AuthMiddleware
};
