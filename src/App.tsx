import { useEffect, useState } from "react";
import "./App.css";
import TaskList from "./components/taskList";
import axios from "axios";
/*
1. fix completed tasks being calculated for waiting tasks - done!
2. disable add botton when there is no task content - done!
*/
function App() {
  /*
  states:
  - tasks: track of the array of tasks.
  - newTask: track of the text input for adding new tasks.
  */

  let [tasks, setTasks] = useState([]);
  let [newTask, addedNewTask] = useState("");

  //get the tasks from the database and push to
  //the tasks array.
  useEffect(() => {
    console.log("loaded");
    //use .propeties
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTasks(result.data))
      .catch((err) => console.log(err));
  }, []);

  const addTask = () => {
    //insert a new task to the to database if the
    //input is not empty.
    if (newTask.trim() !== "") {
      //insert tasks into mongodb
      axios
        .post("http://localhost:3001/add", { task: newTask })
        .then((result) => {
          //use props for rerendering
          location.reload();
        })
        .catch((err) => console.log(err));

      addedNewTask("");
    }
  };

  const calculateDoneTask = (tasks: any[]) => {
    let doneTasks = tasks.filter((task) => task.done === true);
    return doneTasks.length;
  };

  return (
    <>
      <h1 className="display-4 fw-bold">
        Pending Tasks ({tasks.length - calculateDoneTask(tasks)})
      </h1>
      <div className="container d-flex col-md-10 mt-4">
        <input
          placeholder="Add new task..."
          type="text"
          value={newTask}
          className="form-control"
          onChange={(e) => {
            addedNewTask(e.target.value);
          }}
        />

        <button
          onClick={addTask}
          className="btn btn-primary ms-3"
          disabled={!newTask}
        >
          Add
        </button>
      </div>

      <TaskList tasks={tasks} />
    </>
  );
}

export default App;
