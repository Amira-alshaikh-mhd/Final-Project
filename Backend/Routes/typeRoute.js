const express =require('express')
const { getTypes, getTypeById, setType, updateType, deleteType } = require('../Controllers/typeController')
const router = express.Router()

router.get('/', getTypes)

router.get('/:id', getTypeById)


router.post('/', setType)



router.put('/:id',updateType)


router.delete('/:id', deleteType)

module.exports = router