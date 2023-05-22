
const express =require('express')
const router = express.Router();
const countupload=require("../Middleware/countuploader");
const upload = require('../Middleware/upload');

const { getPlaces, getPlaceById, getPlacesByCityName, setplace, updatePlace, deletePlace, getPlacesByTypeName, getPlacesByCountry, getPlacesByCityAndType } = require('../Controllers/placeController');


router.get('/', getPlaces)

router.get('/:id', getPlaceById)

router.get("/placesbyCityName/:cityName", getPlacesByCityName );



router.get("/placesbyTypeName/:typeName", getPlacesByTypeName );


router.get("/placesbyCountry/:countryId", getPlacesByCountry );

// router.get("/placesbyTypeAndCity/:cityId", getPlacesByCityAndType );
router.get('/placesbyTypeAndCity/:cityId', async (req, res) => {
    try {
      const { typeId } = req.query;
      const cityId = req.params.cityId;
            await getPlacesByCityAndType(cityId, typeId, res);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get places' });
    }
  });


router.post('/', upload.array('image'),setplace)



router.put('/:id', upload.array('image'),updatePlace)


router.delete('/:id', deletePlace)

module.exports = router