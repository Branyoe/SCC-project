import {ROLES} from '../models/Roles';
import User from '../models/User';

export const checkRolesExisted = (req, res, next) => {
  if(req.body.roles){
    for(let i = 0; i < req.body.roles.length; i++){
      if(!ROLES.includes(req.body.roles[i])){
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`
        })
      }
    }
  }
  next();
}

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const username = await User.findOne({username: req.body.username});
  if(username) return res.status(400).json({message: "The username already exist"})

  const email = await User.findOne({email: req.body.email});
  if(email) return res.status(400).json({message: "The email already exist"})

  next(); 
}