require("dotenv").config();

const jwt = require("jsonwebtoken");

const { promisify } = require("util");

const authConfig = require("../config/jwt");

export default async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
};
