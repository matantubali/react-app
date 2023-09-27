import React, { ReactNode, useState, useEffect } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import axios from "axios";

interface TaskProps {
  id: string;
  task: string; //the text of the task
  isCompleted: Boolean;
  //onDelete: () => void; //prop: provided function when the "Delete" button is clicked
}

//this component represents an individual task item.
//It includes buttons to complete and delete the task.

function TaskRow({ id, isCompleted, task }: TaskProps) {
  //state variable: if the task is completed or not.
  //let [isCompleted, setIsCompleted] = useState(false);

  //this function used the state "isCompleted" and change
  //his value when the "Complete" button is clicked.

  const updateComplete = (userid: string) => {
    //setIsCompleted(!isCompleted);
    axios
      .put("http://localhost:3001/" + userid)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  const deleteTask = (userid: string) => {
    axios
      .delete("http://localhost:3001/" + userid)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    //className: Applies different styles based on the "isCompleted"
    //state, and giving a green background for the completed task.
    <div
      className={`form-control border p-3 mt-3${
        isCompleted ? " text-bg-success" : ""
      }`}
    >
      <div className="gap-2 d-md-flex">
        <span
          className={`form-control${
            isCompleted ? " text-decoration-line-through" : ""
          }`}
        >
          {task}
        </span>
        <div className="gap-2 d-md-flex justify-content-md-end">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => updateComplete(id)}
          >
            {isCompleted ? "Undo" : "Complete"}
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => deleteTask(id)}
          >
            <BsTrash3Fill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskRow;
