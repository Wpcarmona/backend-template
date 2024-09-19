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
} = require("../controllers/userController");
const { existeUsuarioPorId } = require("../helpers/db-validators");

const { validateFields } = require("../middlewares/validaFieldsMiddleware");
const { validateJWT } = require("../middlewares/validateJWTMiddleware");

const router = Router();

router.get("/", validateJWT, usuariosGet);

router.get("/:id", validateJWT, usuariosGetById);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validateFields,
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
    validateFields,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validateFields,
  ],
  usuariosDelete
);

router.post("/resetpassword", recuperarPasswordUser);

router.post("/updatepass", updatePassWithEmail);

router.post("/code", validateCodeUser);

router.post("/updatepassworduser", [validateJWT], updateEmail);

router.patch("/", usuariosPatch);

module.exports = router;
