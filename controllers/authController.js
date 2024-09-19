const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usersModel");
const { generarJWT } = require("../helpers/generar-jwt");
const blacklist = require("../helpers/token-black-list"); 

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email: email.toUpperCase() });
    if (!usuario) {
      return res.status(200).json({
        header: [
          {
            code: 400,
            error: "El correo o contraseña son incorrectos",
          },
        ],
        body: [{}],
      });
    }

    if (!usuario.state) {
      return res.status(200).json({
        header: [
          {
            code: 400,
            error: "Esta cuenta fue eliminada",
          },
        ],
        body: [{}],
      });
    }

    const validatePassword = bcryptjs.compareSync(password, usuario.password);
    if (!validatePassword) {
      return res.status(200).json({
        header: [
          {
            code: 400,
            error: "El correo o contraseña son incorrectos",
          },
        ],
        body: [{}],
      });
    }

    const token = await generarJWT(usuario.id);

    res.cookie('token', token, {
      httpOnly: true, 
      secure: true,   
      sameSite: 'Strict', 
      maxAge: 14 * 24 * 60 * 60 * 1000, 
  });

    res.status(200).json({
      header: [
        {
          error: "NO ERROR",
          code: 200,
          token
        },
      ],
      body: [usuario],
    });
  } catch (error) {
    console.log("login error ==> " + error);
    return res.status(500).json({
      header: [
        {
          error: "Tuvimos un error, por favor inténtalo más tarde",
          code: 500,
        },
      ],
      body: [{}],
    });
  }
};

const generateNewToken = async (req, res = response) => {
  const { id } = req.query;

  if (!id) {
    return res.status(200).json({
      header: [
        {
          code: 400,
          error: "El ID es necesario",
        },
      ],
      body: [{}],
    });
  }

  try {
    const token = await generarJWT(id);

    res.status(200).json({
      header: [
        {
          error: "NO ERROR",
          code: 200,
        },
      ],
      body: [
        {
          token,
        },
      ],
    });
  } catch (error) {
    console.log("newToken error ==> " + error);
    return res.status(500).json({
      header: [
        {
          error: "Tuvimos un error, por favor inténtalo más tarde",
          code: 500,
        },
      ],
      body: [{}],
    });
  }
};

const logout = async (req, res = response) => {
  try {
    const token = req.header("authorization");
    if (!token) {
      return res.status(200).json({
        header: [
          {
            error: "No existe una autorizacion valida",
            code: 401,
          },
        ],
        body: [{}],
      });
    }
  
    //arreglar el logout
    res.cookie('token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 0
    });

    res.status(200).json({
      header: [
        {
          error: "NO ERROR",
          code: 200,
        },
      ],
      body: [{ message: "Logout exitoso" }],
    });
  } catch (error) {
    console.log("logout error ==> " + error);
    return res.status(500).json({
      header: [
        {
          error: "Tuvimos un error, por favor inténtalo más tarde",
          code: 500,
        },
      ],
      body: [{}],
    });
  }
};



module.exports = {
  login,
  generateNewToken,
  logout,
};
