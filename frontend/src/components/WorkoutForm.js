import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    const[title, setTitle] = useState('')
    const[load, setLoad] = useState('')
    const[reps, setReps] = useState('')
    const[error, setError] = useState(null)
    const[emptyfields,setEmptyfields] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!user){
            setError('You must be logged in')
            return
        }

        const workout = {title, load, reps}

        const response = await fetch('/api/workouts',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyfields(json.emptyfields)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyfields([])
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Habit</h3>

            <label htmlFor="">Habit Title:</label>
            <input 
            type="text"
            onChange={(e)=> setTitle(e.target.value)}
            value={title} 
            className={emptyfields.includes('title') ? 'error': ''}
             />

            <label htmlFor="">Frequency:</label>
            <input 
            type="number"
            onChange={(e)=> setLoad(e.target.value)}
            value={load} 
            className={emptyfields.includes('load') ? 'error': ''}

             />

             <label htmlFor="">Tag:</label>
            <input 
            type="text"
            onChange={(e)=> setReps(e.target.value)}
            value={reps} 
            className={emptyfields.includes('reps') ? 'error': ''}

             />

             <button>Add Habit</button>
             {error && <div className="error">{error}</div> }
        </form>
    )
}

export default WorkoutForm
