require("dotenv").config();

const jwt = require("jsonwebtoken");

const { promisify } = require("util");

export default async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: 'Token inválido' });
  }
};
