
const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      header: [{ error: "No hay token en la petición", code: 401 }],
      body: [{}],
    });
  }

};

module.exports = {
  validarJWT,
};
