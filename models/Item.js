const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    }

    /*month: {
        type: String,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    hour: {
        type: Number,
        required: true
    },
    minute: {
        type: Number,
        required: true
    },
    ampm: {
        type: String,
        required: true
    }*/

});

module.exports = Item = mongoose.model('item', ItemSchema);