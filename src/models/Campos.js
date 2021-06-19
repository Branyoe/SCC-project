import { Schema, model } from 'mongoose';

const campoSchema = new Schema({
  description: String,
},
{
  timestamps: true,
  versionKey: false
})

export default model('Campos', campoSchema);