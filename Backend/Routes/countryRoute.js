const express =require('express')
const router = express.Router()
const {getContries, getCountryById, setcountry }= require('../Controllers/countryController')
const countupload=require("../Middleware/countuploader");

router.get('/', getContries)

router.get('/:id', getCountryById)


router.post('/', countupload.single('image'),setcountry)



// router.put('/:id', updateCategory)


// router.delete('/:id', deleteCategory)

module.exports = router