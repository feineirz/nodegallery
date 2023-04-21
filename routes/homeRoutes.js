const routes = require('express').Router()
const homeController = require('../controllers/homeController')

const uploader = require('../middlewares/uploader')

routes.get('/', homeController.getHome)

routes.get('/gallery', homeController.getGallery)
routes.post('/gallery', uploader.array('gallery', 12), homeController.postGallery)

module.exports = routes
