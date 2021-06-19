import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Roles';

//controlador de signUp
export const signUp = async(req, res) => {
  //datos recividos
  const { username, email, password, roles } = req.body;
  //esquema de nuevo usuario
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password)
  })

  //si existen roles recividos busca el rol en la base de datos segun su "name" y lo sustituye por su _id
  if(roles){
    if(roles.length === 1 && roles[0] === 'admin'){
      roles.push('moderator');
      const foundRole = await Role.find({name: {$in: roles}});
      newUser.roles = foundRole.map(role => role._id);
    }else{
      const foundRole = await Role.find({name: {$in: roles}})
      newUser.roles = foundRole.map(role => role._id)
    }
  }else{//si no lo encuentra pone el rol "user" por defecto
    const role = await Role.findOne({name: "user"});
    newUser.roles = [role._id];
  }

  //guarda usuario en db
  const savedUser = await newUser.save();
  //crea un token
  const token = jwt.sign({id: savedUser._id}, config.SECRET, {
    expiresIn: 259200 //3 dias 
  })

  //responde con el token 
  res.status(200).json({token});
}


export const signIn = async(req, res) => {
  //busca un usuario segun su email
  const userFound = await User.findOne({email: req.body.email}).populate("roles");
  //si el usuario no fu encontrado retorna un mensaje
  if(!userFound) return res.status(400).json({token: null, message: "User not found"});
  //si el usuario fue encontrado compara las contraseñas
  const matchPassword = await User.comparePassword(req.body.password, userFound.password);
  //si las contraseñas no son iguales retorna un mensaje
  if(!matchPassword) return res.status(401).json({token: null, message: "Invalid password"});

  const token = jwt.sign({id: userFound._id}, config.SECRET, {
    expiresIn: 259200 //3 dias 
  })

  console.log(userFound);
  //si todo es correcto devuelve un token 
  res.json({token});
}