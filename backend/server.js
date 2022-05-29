import express from "express"
import mongoose from "mongoose"
import bp from "body-parser"
import orszagRouter from "./routers/orszagRouter.js"
import cors from "cors"
import miniszterelnokRouter from "./routers/miniszterelnokRouter.js"



const app = express()
const PORT = 5005



app.use(bp.json({limit: '50mb'}))
app.use(bp.urlencoded({ extended: true }))


var db = "mongodb://admin:password@localhost:27017/OrszagAPI";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const conSuccess = mongoose.connection
conSuccess.once('open', _ => {
  console.log('Database connected:', db)
})

conSuccess.on('error', err => {
  console.error('connection error:', err)
})

//app.use(cors({origin: 'http://szerveripahonnanakeresfogjonni..'}));

app.use(cors({origin: 'http://localhost'}));

//Have to write it to http://178.48.221.205 if you want to define it as a public page you retard!
//If you are developing, then you have to set it up as http://localhost



app.use('/api/orszag',orszagRouter)

app.use('/api/miniszterelnok',miniszterelnokRouter)



app.listen(PORT,()=>{
    console.log("The server has been created! Port: "+PORT);
})

