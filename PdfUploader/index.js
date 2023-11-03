const express = require('express');
const app = express()
const cors=require('cors')
const mongoose = require('mongoose')
const pdfroute=require("./src/routers/pdfRoutes")
const Userroute=require("./src/routers/userRoutes")
const morgan = require("morgan")


app.use(cors())
app.use(express.json())
app.use(morgan()); 

app.use("/uploads",express.static("uploads"))

mongoose
  .connect("mongodb://127.0.0.1:27017/PdfUploader", {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull!"))  
  .catch((err) => {
    console.log(err);
  }); 

  app.use("/",pdfroute)
  app.use("/",Userroute)

app.listen(5555,()=>{
    console.log('surver is running 5555');
})