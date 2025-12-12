const mongoose = require('mongoose');

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
    entries: {type: Array},
    createdAt: { type: Date, default: Date.now }

})


module.exports = mongoose.model('Habit', habitSchema)


