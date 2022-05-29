import Orszag from "../models/OrszagModel.js"
import express from "express"
import { body, validationResult } from 'express-validator';
import Miniszterelnok from "../models/MiniszterelnokModel.js"



const orszagRouter = express.Router()


orszagRouter.get("/", async (req,res)=>{
	const orszagok = await Orszag.find().populate('miniszterelnok')
	res.send(orszagok)
})

orszagRouter.get("/getOrszagById",body('orszagId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})


	Orszag.findById(req.body.orszagId).populate('miniszterelnok').then(orszag => res.json(orszag)).catch(error => res.status(400).json({error: "Orszag not found!"}))



})

orszagRouter.post("/createOrszag",body('name').notEmpty(),body('fovaros').notEmpty(),body('miniszterelnokId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})
	


	Orszag.count({name:req.body.name},function(error,count){
		if(count!=0){
			res.status(500).json("Ez az ország már létezik!")
			return
		}else{
			Orszag.create({
				name: req.body.name,
				fovaros: req.body.fovaros,
				miniszterelnok: req.body.miniszterelnokId
			}).then(orszag => res.json(orszag)).catch(error => res.status(500).json(error))
		}

	})

	})

	


orszagRouter.delete("/deleteOrszag",body('orszagId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})

	Orszag.deleteOne({_id:req.body.orszagId}).then(()=>{res.status(200).send()}).catch(error => res.status(500).json(error))

})

orszagRouter.patch("/updateOrszag",body('orszagId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})



	Orszag.findByIdAndUpdate(req.body.orszagId, req.body, {new: true}).then((orszag) => {
		if (!orszag) {
			return res.status(404).send();
		}
		res.send(orszag);
	}).catch((error) => {
		res.status(500).send(error);
	})	

})

	


export default orszagRouter