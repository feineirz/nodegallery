const galleryModel = require('../models/galleryModel')

exports.getHome = (req, res) => {
    return res.render('index', {
        pageName: 'home',
        pageTitle: 'Home',
    })
}

exports.getGallery = async (req, res) => {
    const data = await galleryModel.find()
    return res.render('gallery', {
        pageName: 'gallery',
        pageTitle: 'Gallery',
        data: data,
    })
}

exports.postGallery = (req, res) => {
    if (req.files) {
        req.files.forEach(file => {
            galleryModel.create({
                path: file.path.replace('public/', ''),
            })
        })
        return res.redirect('/gallery')
    } else {
        console.log('no file available!')
        return res.redirect('/gallery')
    }
}
