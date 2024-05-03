const express = require('express')
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
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
router.delete('/:id',deleteWorkout)
// Upadate a workout
router.patch('/:id',updateWorkout)
module.exports = router