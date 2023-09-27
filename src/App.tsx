import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import React from "react";
import TaskList from "./components/taskList";
import axios from "axios";

function App() {

  /*
  states:
  - tasks: track of the array of tasks.
  - newTask: track of the text input for adding new tasks.
  */

  let [tasks, setTasks] = useState([]);
  let [newTask, setNewTask] = useState("");

  //get the tasks from the database and push to
  //the tasks array.
  useEffect(() => {
    axios.get('http://localhost:3001/get')
    .then(result => setTasks(result.data))
    .catch(err => console.log(err))
  }, [])
 
  const addTask = () => {
    //insert a new task to the to database if the 
    //input is not empty.
    if (newTask.trim() !== "") {

      //insert tasks into mongodb
      axios.post('http://localhost:3001/add', {task: newTask})
        .then(result => {
          location.reload()
        })
        .catch(err => console.log(err))

      setNewTask("");
    }
  };

  return (
    <div>
      <h1 className="display-4 fw-bold">Pending Tasks ({tasks.length})</h1>
      <div className="container d-flex col-md-10 mt-4">
        <input
          placeholder="Add new task..."
          type="text"
          value={newTask}
          className="form-control"
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
        />

        <button onClick={addTask} className="btn btn-primary ms-3">
          Add
        </button>
      </div>

      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
