import Campo from '../models/Campos'
import User from '../models/User';
import Answer from '../models/Answer';

//create a new campo
export const createCampo = async (req, res)=>{
  try {
    if(!req.body.description) return res.status(403).json({message: "incoplet request"});
    const { description } = req.body;
  
    const newCampo = new Campo({description});
    const campoSaved = await newCampo.save()

    res.status(201).json(campoSaved)
  } catch (e) {
    res.status(403).json(e);
  }
} 

//get all campos
export const getCampos = async (req, res)=>{
  try {
    const campos = await Campo.find();
    res.status(200).json(campos);
  } catch (e) {
    res.status(403).json(e);
  }
}

//get a campo by id
export const getCampoById = async(req, res)=>{
  try {
    if(!req.params.campoId) return res.status(403).json({message: "id not received"});
    const campo = await Campo.findById(req.params.campoId);
    res.status(200).json(campo);
  } catch (e) {
    res.status(403).json(e);
  }
}

//update a campo by id
export const updateCampoById = async(req, res)=>{
  try {
    if(!req.params.campoId) return res.status(403).json({message: "id not received"});

    if(!req.body.description) return res.status(403).json({message: "incoplet request"});
    const updatedCampo = await Campo.findByIdAndUpdate(req.params.campoId, req.body, {
      new: true
    });
    res.status(200).json(updatedCampo);
  } catch (e) {
    res.status(403).json(e);
  }
}

//delete a campo by id
export const deleteCampoById = async(req, res)=>{
  try {
    if(!req.params.campoId) return res.status(403).json({message: "id not received"})
    await Answer.deleteMany({campo: req.params.campoId});
    await Campo.findByIdAndDelete(req.params.campoId)
    res.status(204).json()
  } catch (e) {
    res.status(403).json(e);
  }
}
