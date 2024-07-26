import { useState, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [count, setCount] = useState(workout.count || 0); // Initialize count state
  const [completed, setCompleted] = useState(workout.count >= workout.load);
  const remainingDays = Math.max(0, workout.load - count);

  useEffect(() => {
    if (count >= workout.load) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [count, workout.load]);

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  const handleIncrement = async () => {
    if (!user) {
      return;
    }

    const updatedCount = count + 1;
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'PATCH',
      body: JSON.stringify({ count: updatedCount }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      setCount(updatedCount);
      dispatch({ type: 'UPDATE_WORKOUT', payload: json });
    }
  };

  return (
    <div className={`workout-details ${count >= workout.load ? 'completed' : ''}`}>
      <h4 className={count >= workout.load ? 'strikethrough' : ''}>{workout.title}</h4>
      <p><strong>Target: </strong>{workout.load} days</p>
      <p><strong>Remaining Days: </strong>{remainingDays} days</p> {/* Display remaining days */}
      <p><strong>Tag: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      {completed ? (
        <p style={{color: "#1aac83"}} className="congratulations-message">Congratulations, you have completed your goal!</p>
      ) : (
        <button onClick={handleIncrement} className="completed-button">Completed</button>
      )}
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  );
};

export default WorkoutDetails;
