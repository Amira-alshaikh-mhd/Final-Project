const express =require('express')
const router = express.Router()
const {getContries, getCountryById, setcountry,updateCountry, deleteCountry  }= require('../Controllers/countryController')
const countupload=require("../Middleware/countuploader");

router.get('/', getContries)

router.get('/:id', getCountryById)


router.post('/', countupload.single('image'),setcountry)



router.put('/:id', countupload.single('image'),updateCountry)


router.delete('/:id', deleteCountry)

module.exports = router