const countryModel = require('../Models/countryModel')
const cloudinary= require ('cloudinary').v2;
const path = require("path");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
   

});




// get all countries
const getContries = async(req, res) => {
    const countries = await countryModel.find()
    
        res.status(200).json(countries)
    }
    
    //get by Id
    const getCountryById = async (req, res) => {
        try {
          const country = await countryModel.findById(req.params.id);
          if (!country) {
            return res.status(404).send();
          }
          res.json(country);
    
        } catch (error) {
          res.status(500).send(error);
        }
      };
    
    
    
    
 
    
    
    
    
      
    const setcountry=async(req,res)=>{
        
        try{
          const result = await cloudinary.uploader.upload(req.file.path);
        if(!req.body){
            return res.status(400).json({message:"Error"})
        }
        else{
    
    
            const country = await countryModel.create({
            name:req.body.name,
           
            image: {
              public_id: result.public_id,
              url: result.secure_url,
            },
        
    
                });
    
           return res.status(200).json({message: "country created successfully"})
        }}
        catch(err){
            console.log("error ",err)
        }
    }
    
    
    // const updateCategory = async (req, res) => {
    //   const category =await CategoryModel.findById(req.params.id)
      
      
    //   if (!category){
    //       res.status(400)
    //       throw new Error('Category not found')
    //   }
    //   const updatedCategory = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, {new: true,})
      
    //       if(req.body.sale){
    //           const product = await productModel.find({category: req.params.id})
    //           console.log('product: ' ,product)
    //           product.map(async (obj)=> {
    //               const updatedProduct = await productModel.findByIdAndUpdate(obj._id, {priceAfterDiscount: obj.price * (1- req.body.sale/100)})
      
      
    //           })
    //       }
    //       res.status(200).json(updatedCategory)
    //   }
    
    
    // const deleteCategory =  async(req, res) => {
    //     const category =await CategoryModel.findById(req.params.id)
    
    // if (!category){
    //     res.status(400)
    //     throw new Error('Category not found')
    // }
    //  await category.deleteOne()
    //     res.status(200).json({id: req.params.id})
    // }
    
    module.exports ={
        getContries,
        getCountryById,
        setcountry,
        // updateCategory,
        // deleteCategory,
    }