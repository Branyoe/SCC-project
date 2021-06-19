import Answer from "../models/Answer";

export const createAnswer = async(req, res) => {
  try {
    
    const { respost, campo, user } = req.body;

    if(!respost || !campo || !user) return res.status(403).json({message: "incoplet request"});

    const newAnswer = new Answer({
      respost,
      campo,
      user
    });

    const answerSaved = await newAnswer.save();

    res.status(201).json(answerSaved);
    
  } catch (e) {
    res.status(403).json(e);
  }
}

export const getAnswers = async(req, res) => {
  try {
    const answers = await Answer.find();
    res.status(200).json(answers);
  } catch (error) {
    res.status(403).json(error);
  }
}

export const getAnswersByUserId = async(req, res) => {
  try {
    if(!req.params.userId) return res.status(403).json({message: "userID not provied"});
    const answers = await Answer.find({user: req.params.userId});
    res.status(200).json(answers)
  } catch (error) {
    res.status(403).json(error);
  }
}

export const updateAnswerById = async(req, res) => {
  try {
    if(!req.params.answerId) return res.status(403).json({message: "answerID not provied"});
    if(!req.body) return res.status(403).json({message: "incoplet request"});
    
    const updatedAnswers = await Answer.findByIdAndUpdate(req.params.answerId, req.body, {new: true});
    res.status(200).json(updatedAnswers)
  } catch (error) {
    res.status(403).json(error);
  }
}

export const deleteAnswerById = async (req, res) => {
  try {
    if(!req.params.answerId) return res.status(403).json({message: "answerID not provied"});
    await Answer.findByIdAndDelete(req.params.answerId)
    res.status(204).json()
  } catch (error) {
    res.status(403).json(error);
  }
}