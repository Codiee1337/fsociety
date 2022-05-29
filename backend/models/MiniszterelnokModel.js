import mongoose from "mongoose"
import Orszag from "../models/OrszagModel.js"

const Miniszterelnok = mongoose.Schema({
	name: String,
	szuletesidatum: Date
},{
	versionKey: false
})

export default mongoose.model('Miniszterelnok', Miniszterelnok,'Miniszterelnokok')