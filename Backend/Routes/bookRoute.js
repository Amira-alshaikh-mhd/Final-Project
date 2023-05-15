
const express =require('express');
const { getbooks, getBookById, setBook, updateBook, deleteBook, getBooksByHostName, getBooksByUserName } = require('../Controllers/bookController');
const router = express.Router();


router.get('/', getbooks)

router.get('/:id', getBookById)

router.get("/bookByUserName/:userName", getBooksByUserName);



router.get("/bookByHostName/:hostName", getBooksByHostName);



router.post('/',setBook)



router.put('/:id',updateBook)


router.delete('/:id', deleteBook)

module.exports = router