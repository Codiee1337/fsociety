import mongoose from "mongoose"

const Orszag = mongoose.Schema({
	name: String,
	fovaros: String,
	miniszterelnok: {type: mongoose.Schema.Types.ObjectId, ref:'Miniszterelnok'}
},{
	versionKey: false
})


export default mongoose.model('Orszag', Orszag,'Orszagok')