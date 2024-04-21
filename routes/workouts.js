const express = require('express')
const {
    createWorkout,
    getWorkout,
    getWorkouts
}= require('../controllers/workoutController')
//instance of router
const router = express.Router()

//Get all workouts
router.get('/',getWorkouts)

//GET a single workout
router.get('/:id',getWorkout)

//POST a new workout
router.post('/',createWorkout)

//Delete a owrkout
router.delete('/:id',(req,res)=>{
    res.json({mssg:'DELETE a new workout'})
})

// Upadate a workout
router.patch('/:id',(req,res)=>{
    res.json({mssg:'Upadate a workout'})
})
module.exports = router