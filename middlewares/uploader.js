const path = require('path')

const multer = require('multer')
const sharpMulter = require('sharp-multer')

const storage = sharpMulter({
    destination: (req, file, cb) => {
        // Rename original file
        console.log(file)
        file.originalname = `${file.fieldname}${path.extname(file.originalname)}`
        if (file.fieldname == 'gallery') {
            cb(null, 'public/upload/images/gallery/')
        } else {
            cb(null, 'public/upload/')
        }
    },

    imageOptions: {
        useTimestamp: true,
        fileFormat: 'jpg',
        quality: 90,
        resize: {
            width: 1200,
            reziseMode: 'contain',
        },
    },
})

module.exports = multer({ storage })
