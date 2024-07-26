const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({

    title:{
        type: String,
        required: true
    },
    reps:{
        type: String,
        required: true
    },
    load:{
        type:Number,
        required: true
    },
    count: {
        type: Number,
        default: 0 // Default to 0
    },
    completed: {
        type: Boolean,
        default: false // Default to false
    },
    user_id:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Workout',workoutSchema)

