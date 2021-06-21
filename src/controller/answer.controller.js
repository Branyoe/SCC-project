import Answer from "../models/Answer";
import User from "../models/User";
import Campos from "../models/Campos"
import jwt from 'jsonwebtoken';
import config from '../config';

export const createAnswer = async (req, res) => {
  try {
    //validaciones*************************************

    //req.body validation
    if (!req.body) return res.status(403).json({ message: "Incomplet request" });
    const { answer, campo } = req.body;

    //extrae el id del usuario desde el token par automatizar el procseso
    const decoded = jwt.verify(req.headers["x-access-token"], config.SECRET);
    const user = decoded.id;

    //valida que no halla id ya relacionadas
    const foundAnswer = await Answer.find({ user: { $eq: user }, campo: { $eq: campo } });
    if (!foundAnswer.length == 0) return res.status(403).json({ message: "the related 'campo' is already registered" });

    //answerReq validation
    if (!answer || answer === '') return res.status(403).json({ message: "invalid answer" });

    //User validation
    const foundUser = await User.findById(user);
    if (!foundUser) return res.status(403).json({ message: "User match not found" });

    //Campo validation
    const foundCampo = await Campos.findById(campo);
    if (!foundCampo) return res.status(403).json({ message: "Campo match not found" });

    //NewAnswer create process*******************************
    //Answer Schema
    const newAnswer = new Answer({
      answer,
      campo,
      user
    });

    //Answer saved
    const answerSaved = await newAnswer.save();

    //res***************************************
    res.status(201).json(answerSaved);
  } catch (e) {
    res.status(403).json(e);
  }
}

export const getAnswers = async (req, res) => {
  try {
    const answers = await Answer.find();
    res.status(200).json(answers);
  } catch (error) {
    res.status(403).json(error);
  }
}

export const getAnswersByUserId = async (req, res) => {
  try {
    if (!req.params.userId) return res.status(403).json({ message: "userID not provied" });

    const foundUser = await User.findById(req.params.userId);
    if (!foundUser) return res.status(403).json({ message: "user not found" });

    const answers = await Answer.find({ user: req.params.userId });
    res.status(200).json(answers)
  } catch (error) {
    res.status(403).json(error);
  }
}

export const getMyAnswers = async (req, res) => {
  console.log('entro');
  try {
    //validations****************************************
    ///extrae el id del usuario desde el token par automatizar el procseso
    
    const decoded = jwt.verify(req.headers["x-access-token"], config.SECRET);
    const user = decoded.id;
     
      //busca un usuario relacionado
    const foundUser = await User.findById(user);
    if(!foundUser) res.status(403).json({ message: "invalid User" });

      //busqueda de aswers relacionadas
    const answers = await Answer.find({ user: user });
    res.status(200).json(answers);
  } catch (e) {
    res.status(403).json(e);
  }
}

export const updateAnswerById = async (req, res) => {
  try {
    if (!req.params.answerId) return res.status(403).json({ message: "answerID not provied" });
    if (!req.body) return res.status(403).json({ message: "incoplet request" });

    const foundAnswer = await Answer.findById(req.params.answerId);
    if(!foundAnswer) return res.status(403).json({ message: "answer not found" });

    const updatedAnswers = await Answer.findByIdAndUpdate(req.params.answerId, req.body, { new: true });
    res.status(200).json(updatedAnswers)
  } catch (error) {
    res.status(403).json(error);
  }
}

export const deleteAnswerById = async (req, res) => {
  try {
    if (!req.params.answerId) return res.status(403).json({ message: "answerID not provied" });
    const foundAnswer = await Answer.findById(req.params.answerId);
    if(!foundAnswer) return res.status(403).json({ message: "answer not found" });
    await Answer.findByIdAndDelete(req.params.answerId)
    res.status(204).json()
  } catch (error) {
    res.status(403).json(error);
  }
}