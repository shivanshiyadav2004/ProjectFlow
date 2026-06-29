const route = require('express').Router()
const {verifyToken}= require('../middleware/authmiddleware')
const {login,register,dashboard , uploadFiles , teachers} = require('../controllers/userController')
const { upload } = require('../files/files')



route.post('/signup',register)
route.post('/login',login)
route.get('/allteachers',teachers)
route.get('/dashboard/:id',verifyToken,dashboard)
route.post('/upload',upload.single("image"), uploadFiles)

module.exports = route