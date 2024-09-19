
const jwt = require('jsonwebtoken');
const blacklist = require('../helpers/token-black-list'); 

const validarJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      header: [{ error: "No hay token en la petición", code: 401 }],
      body: [{}],
    });
  }

  try {
    if (blacklist.isBlacklisted(token)) {
      return res.status(401).json({
        header: [{ error: "Token inválido o expirado", code: 401 }],
        body: [{}],
      });
    }

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req.uid = uid;
    
    next();
  } catch (error) {
    return res.status(401).json({
      header: [{ error: "Token inválido", code: 401 }],
      body: [{}],
    });
  }
};

module.exports = {
  validarJWT,
};
