const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
  usuariosGetById,
  recuperarPasswordUser,
  updatePassWithEmail,
  validateCodeUser,
  updateEmail,
} = require("../controllers/user.controller");
const { existeUsuarioPorId } = require("../helpers/db-validators");

const { validateCampos } = require("../middlewares/validar-campos");
const { validateJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validateJWT, usuariosGet);

router.get("/:id", validateJWT, usuariosGetById);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validateCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("name"),
    check("email"),
    check("password"),
    check("phone"),
    check("directory"),
    validateCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validateCampos,
  ],
  usuariosDelete
);

router.post("/resetpassword", recuperarPasswordUser);

router.post("/updatepass", updatePassWithEmail);

router.post("/code", validateCodeUser);

router.post("/updatepassworduser", [validateJWT], updateEmail);

router.patch("/", usuariosPatch);

module.exports = router;
