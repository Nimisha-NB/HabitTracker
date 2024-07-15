const express = require('express')
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}= require('../controllers/workoutController')


//require auth for all workout routes
const  requireAuth = require('../middleware/requireAuth')
//instance of router
const router = express.Router()

router.use(requireAuth)

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