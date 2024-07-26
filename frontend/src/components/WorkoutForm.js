import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState(''); 
  const [reps, setReps] = useState('Health');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const categories = ['Health', 'Productivity', 'Hobby', 'Fitness', 'Study'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in');
      return;
    }

    const workout = { title, load, reps, count: 0 };

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }
    if (response.ok) {
      setTitle('');
      setLoad('');
      setReps('Health');
      setError(null);
      setEmptyFields([]);
      console.log('new workout added', json);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Habit</h3>

      <div className="form-group">
        <label htmlFor="title">Habit Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''}
        />
      </div>

      <div className="form-group">
        <label htmlFor="load">Target:</label>
        <input
          type="load"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes('load') ? 'error' : ''}
        />
      </div>

      <div className="form-group">
        <label htmlFor="reps">Tag:</label>
        <select
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes('reps') ? 'error' : ''}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <button className="submit-button">Add Habit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
