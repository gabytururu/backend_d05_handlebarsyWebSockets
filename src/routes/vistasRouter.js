const path = require('path')
const Router = require("express").Router
const ProductManager = require('../dao/productManager')
const router = Router()
const prodsDataFilePath = path.join(__dirname,'..','data','products.json')
const productManager = new ProductManager(prodsDataFilePath)

router.get("/",async(req,res)=>{
    
        let products = await productManager.getProducts()
        console.log(products)
        const limit  = req.query.limit
        if(limit && limit > 0){
            products=products.slice(0,limit)
        }
        // res.status(200).json(products)
        
        res.setHeader('Content-Type', 'text/html')
        res.status(200).render('home', 
        {titulo:"Home Page",
        products
        }
        )    
})

router.get("/realtime",(req,res)=>{
//router.get("/realtime",async(req,res)=>{
    // let products = await productManager.getProducts()
    
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('realTimeProducts', 
    {titulo:"Real Time Products"},
    // products
)
})

module.exports=router