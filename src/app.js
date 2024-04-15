const express = require("express")
const {engine} =require("express-handlebars")
const productsRouter=require('./routes/productsRouter.js')
const cartsRouter=require('./routes/cartsRouter.js')
const vistasRouter = require('./routes/vistasRouter.js')

const PORT = 8080
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views") // cambiar a absolute path?

app.use("/api/products/", productsRouter)  
app.use("/api/carts/", cartsRouter)
app.use("/", vistasRouter)
app.listen(PORT,()=>{
    console.log(`PrimeraEntrega_APP is now Live on Port ${PORT}`)
})