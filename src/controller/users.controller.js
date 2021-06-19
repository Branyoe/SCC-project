import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Roles';

//Create a new user
export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;
    if(!username || !email || !password) return res.status(401).json({message: "incomplet request"});

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
  } catch (e) {
    res.status(403).json(e);
  }
}

//get all Users
export const getUsers = async(req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(403).json(e);
  }
}

//get users by id
export const getUserById = async(req, res) => {
  try {
    if(!req.params.userId) res.status(403).json({message: "id not received"})
    const user = await User.findById(req.params.userId);
    if(!user) return res.status(403).json({message: "a user related to the id was not found"})
    res.status(200).json(user);
  } catch (e) {
    res.status(403).json(e);
  }
}

//update a user by id
export const updateUserById = async(req, res) => {
  try {
      //datos recividos
    const { username, email, password, roles } = req.body;
    if(!username || !email || !password) return res.status(403).json({message: "incoplet request"});
    //esquema de nuevo usuario
    const updatedUser = {
      username,
      email,
      password: await User.encryptPassword(password),
      roles
    }

    if(roles){
      const foundRole = await Role.find({name: {$in: roles}})
      updatedUser.roles = foundRole.map(role => role._id)
    }else{//si no lo encuentra pone el rol "user" por defecto
      const role = await Role.findOne({name: "user"});
      updatedUser.roles = [role._id];
    }

    const user = await User.findByIdAndUpdate(req.params.userId, updatedUser,{
      new: true
    })

    res.status(200).json(user);
  } catch (e) {
    res.status(403).json(e); 
  }
}

//delete a user by id
export const deleteUserById = async(req, res) => {
  try {
    if(!req.params.userId) return res.status(403).json({message: "id not received"})
    await User.findByIdAndDelete(req.params.userId);
    res.status(204).json();
  } catch (e) {
    res.status(403).json(e)
  }
}