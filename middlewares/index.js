const ValidateJWT = require("../middlewares/validar-jwt");
const ValidateRoles = require("../middlewares/validar-roles");
const ValidateCampos = require("../middlewares/validar-campos");

module.exports = {
  ...ValidateCampos,
  ...ValidateJWT,
  ...ValidateRoles,
};
