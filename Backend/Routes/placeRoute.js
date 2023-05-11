
const express =require('express')
const router = express.Router();
const countupload=require("../Middleware/countuploader");
const upload = require('../Middleware/upload');

const { getPlaces, getPlaceById, getPlacesByCityName, setplace, updatePlace, deletePlace, getPlacesByTypeName } = require('../Controllers/placeController');


router.get('/', getPlaces)

router.get('/:id', getPlaceById)

router.get("/placesbyCityName/:cityName", getPlacesByCityName );



router.get("/placesbyTypeName/:typeName", getPlacesByTypeName );



router.post('/', upload.array('image'),setplace)



router.put('/:id', upload.array('image'),updatePlace)


router.delete('/:id', deletePlace)

module.exports = router