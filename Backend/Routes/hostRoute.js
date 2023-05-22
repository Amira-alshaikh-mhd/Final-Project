const express =require('express')
const router = express.Router()
const countupload=require("../Middleware/countuploader");
const { getHosts, getHostById, setHost, updateHost, deleteHost, login, logout, getbyCity } = require('../Controllers/hostController');

router.get('/', getHosts)

router.get('/:id', getHostById)

router.get("/getbyCity/:id", getbyCity)


router.post('/', countupload.single('image'),setHost)


router.post('/login', login);

router.get('/logout', logout);



router.put('/:id', countupload.single('image'),updateHost)


router.delete('/:id', deleteHost)

module.exports = router