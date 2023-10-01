import { useEffect, useState } from "react";
import "./App.css";
import TaskList from "./components/taskList";
import axios from "axios";


function App() {

  let [tasks, setTasks] = useState([]);
  let [newTask, addedNewTask] = useState("");

  useEffect(() => {
    console.log("loaded");
    axios
      .get('http://localhost:3001/get')
      .then((result) => setTasks(result.data))
      .catch((err) => console.log(err));
  }, []);

  const addTask = () => {
    if (newTask.trim() !== "") {
      axios
        .post("http://localhost:3001/add", { taskDesc: newTask })
        .then((result) => {
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
