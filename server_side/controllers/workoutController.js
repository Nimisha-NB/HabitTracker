const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
//get all workouts
const getWorkouts = async (req,res)=>{

    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt: -1})
    

    res.status(200).json(workouts)
}

//get a single workout
const getWorkout = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }
    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}
// create new workout
const createWorkout = async (req,res)=>{
    const {title,load,reps} = req.body

    let emptyfields = []

    if(!title){
        emptyfields.push('title')
    }
    if(!load){
        emptyfields.push('load')
    }
    if(!reps){
        emptyfields.push('reps')
    }
    if(emptyfields.length>0){
        return res.status(400).json({error: 'Please fill in all the fields',emptyfields})
    }

    //ADD DOC TO DB
    try{
        const user_id = req.user._id
        const workout = await Workout.create({title,load,reps,user_id})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error: error.message})

    }
}

//delete a workout
const deleteWorkout  = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return res.status(404).json({error: "No such workout"})
    }
    res.status(200).json(workout)
}

const updateWorkout = async (req, res) => {
    const { id } = req.params;
    const { count } = req.body; // Get the count from request body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }

    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({ error: "No such workout" });
    }

    // Update the workout with new count
    workout.count = count;

    // If the count equals or exceeds the load, mark the workout as completed
    workout.completed = workout.count >= workout.load;

    const updatedWorkout = await workout.save();

    res.status(200).json(updatedWorkout);
};



module.exports = {
    getWorkout,
    getWorkouts,
createWorkout,
deleteWorkout,
updateWorkout
}