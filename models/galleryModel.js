const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    path: {
        type: String,
        required: true,
        unique: true,
    },
})

module.exports = mongoose.model('Gallery', schema)
