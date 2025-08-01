const mongoose = require('mongoose');

const trackerSchema = new mongoose.Schema({
    date: { type: String, required: true }, 
    value: { type: mongoose.Schema.Types.Mixed, required: true }
})

const habitSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type:String,
        required: true,
    },
    type: {type: String, enum:['Boolean', 'number', 'text']},
    entries: [trackerSchema],
    createdAt: { type: Date, default: Date.now }

})


module.exports = mongoose.model('Habit', habitSchema)