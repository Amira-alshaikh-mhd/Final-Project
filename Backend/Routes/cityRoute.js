
const express =require('express')
const router = express.Router();
const countupload=require("../Middleware/countuploader");
const { getCities, getCityById, setCity, updateCity, deleteCity, getCitiesByCountryName, getCityByCountry } = require('../Controllers/cityController');

router.get('/', getCities)

router.get('/:id', getCityById)

router.get("/citiesbyCountryName/:countryName", getCitiesByCountryName );


router.get("/citiesbyCountry/:id", getCityByCountry );



router.post('/', countupload.single('image'),setCity)



router.put('/:id', countupload.single('image'),updateCity)


router.delete('/:id', deleteCity)

module.exports = router





















