import { Schema, model } from "mongoose";
const Campo = model('Campos');
const User = model('User');

const answerSchema = new Schema({
  respost: {
    type: String,
  },
  campo: {
    type: Schema.ObjectId,
    ref: 'Campo'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
},{
  timestamps: true,
  versionKey: false
})

export default model('Answer', answerSchema);