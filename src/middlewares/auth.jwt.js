import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import Role from '../models/Roles';

//se usa a modo de middleware y sirve para verificar si el usuario tiene acceso a la ruta
export const verifyToken = async (req, res, next) => {
  try {
    //resivimos un token
    const token = req.headers["x-access-token"];
    //verificamos que el token exista
    if(!token) return res.status(403).json({message: "No token provided"});
    //si el token existe verificamos que sea valido y lo almacenamos
    const decoded = jwt.verify(token,config.SECRET);
    req.userId = decoded.id;
    //buscamos un usuario segun el id codificada dentro del token 
    const user = await User.findById(req.userId, {password: 0});
    //si usuario no existe responde un mensaje
    if(!user) return res.status(404).json({message: "User not found"})
    //si el usuario existe continuamos
    next();
  } catch (error) {
    return res.status(401).json({message: "Unauthorized"})
  }
};

//role moderator
export const isModerator = async(req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({_id: {$in: user.roles}});
  for(let i=0; i<roles.length; i++){
    if(roles[i].name === "moderator"){
      next();
      return;
    }
  }
  
  return res.status(403).json({message: "require moderator role"});
}

//role admin
export const isAdmin = async(req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({_id: {$in: user.roles}});
  for(let i=0; i<roles.length; i++){
    if(roles[i].name === "admin"){
      next();
      return;
    }
  }
  
  return res.status(403).json({message: "require admin role"});
}

//role user 
export const isUser = async(req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({_id: {$in: user.roles}});
  for(let i=0; i<roles.length; i++){
    if(roles[i].name === "user"){
      next();
      return;
    }
  }
  
  return res.status(403).json({message: "require user role"});
}