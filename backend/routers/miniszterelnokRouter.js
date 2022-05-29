import Miniszterelnok from "../models/MiniszterelnokModel.js"
import Orszag from "../models/OrszagModel.js"
import express from "express"
import { body, validationResult } from 'express-validator';

const miniszterelnokRouter = express.Router()

miniszterelnokRouter.get("/", async (req,res)=>{
	const miniszterelnokok = await Miniszterelnok.find()
	res.send(miniszterelnokok)
})


//Igen tudom, hogy visszalehetne adni, de egyszerűen annyit kopott az Mongoose tudásom, hogy fiiingom sincsen, hogy hogy lehet a modelbe belerakni
//az ország modelt és a response-be visszaadni az országot is -.-", úgyhogy frontenden lesz megoldva :)
miniszterelnokRouter.get("/getMiniszterelnokById",body('miniszterelnokId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})


	Miniszterelnok.findById(req.body.miniszterelnokId).then(
		miniszterelnok => {
			if(miniszterelnok!=null){
				res.json(miniszterelnok)
			}
		

		}
		).catch(error => {
	
			res.status(500).json({error: "Miniszterelnök nem található!"})
		})

})

miniszterelnokRouter.post("/createMiniszterelnok",body('name').notEmpty(),body('szuletesidatum').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})
	


	Miniszterelnok.count({name:req.body.name},function(error,count){
		if(count!=0){
			res.status(500).json("Ez a miniszterelnök már létezik!")
			return
		}else{
			Miniszterelnok.create({
				name: req.body.name,
				orszagId: req.body.orszagId,
                szuletesidatum: Date.parse(req.body.szuletesidatum)
			}).then(miniszterelnok => res.json(miniszterelnok)).catch(error => res.status(500).json(error))
		}

	})

})

miniszterelnokRouter.delete("/deleteMiniszterelnok",body('miniszterelnokId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})

	Miniszterelnok.deleteOne({_id:req.body.miniszterelnokId}).then(()=>{res.status(200).send()}).catch(error => res.status(500).json(error))

})

miniszterelnokRouter.patch("/updateMiniszterelnok",body('miniszterelnokId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})



	Miniszterelnok.findByIdAndUpdate(req.body.miniszterelnokId, req.body, {new: true}).then((miniszterelnok) => {
		if (!miniszterelnok) {
			return res.status(404).send();
		}
		res.send(miniszterelnok);
	}).catch((error) => {
		res.status(500).send(error);
	})	

})

export default miniszterelnokRouter