const path = require('path');
const express = require("express");
const {engine} =require("express-handlebars");
const productsRouter=require('./routes/productsRouter.js');
const cartsRouter=require('./routes/cartsRouter.js');
const vistasRouter = require('./routes/vistasRouter.js');
const {Server}= require("socket.io");


const PORT = 3000;
const app=express();
let io;

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views") // cambiar a absolute path?

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'/public')))

app.use("/api/products/", (req,res,next)=>{
    req.io=io
    next()
},productsRouter)  
app.use("/api/carts/", cartsRouter)
app.use("/", vistasRouter)

const server=app.listen(PORT,()=>{
    console.log(`Desafio5_Websockets&handlebars is now Live on Port ${PORT}`)
})
io = new Server(server)

io.on("connection", socket=>{
    console.log(`Realtime products view has a Live User Connected with id: ${socket.id}`)
})

module.exports={io}