import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    ref: 'Role',
    type: Schema.Types.ObjectId
  }]
},{
  timestamps: true,
  versionKey: false
});

userSchema.statics.encryptPassword = async(password) => {
  const salt =  await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
  // const hash = await bcrypt.hash(password, 10);
  // return hash;
}

userSchema.statics.comparePassword = async(password, recivedPassword) => {
  return  await bcrypt.compare(password, recivedPassword);
}

export default model('User', userSchema);