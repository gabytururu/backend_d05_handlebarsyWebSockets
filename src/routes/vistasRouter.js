const path = require('path')
const Router = require("express").Router
const ProductManager = require('../dao/productManager')
const router = Router()
const prodsDataFilePath = path.join(__dirname,'..','data','products.json')
const productManager = new ProductManager(prodsDataFilePath)

router.get("/",async(req,res)=>{
        let products
        try{
            products = await productManager.getProducts()
            console.log(products)
            const limit  = req.query.limit
            if(limit && limit > 0){
                products=products.slice(0,limit)
            }
        }catch(err){
            console.log(err)
            res.setHeader('Content-Type', 'application/json')
            return res.status(500).json({
                error: err.error,
                message:err.message
            })
        }
        
        res.setHeader('Content-Type', 'text/html')
        res.status(200).render('home', {
            titulo:"Home Page",
            products
            }
        )    
})

router.get("/realtime",async(req,res)=>{
    let products
    try{
        products = await productManager.getProducts()
        console.log(products)
        const limit  = req.query.limit
        if(limit && limit > 0){
            products=products.slice(0,limit)
        }
    }catch(err){
        console.log(err)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            error: err.error,
            message:err.message
        })
    }
    
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('realTimeProducts', {
        titulo:"Realtime Products",
        products
        }
    )    
})


module.exports=router