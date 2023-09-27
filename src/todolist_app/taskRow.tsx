import React, { ReactNode, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";

interface TaskProps {
  task: string; //the text of the task
  //onDelete: () => void; //prop: provided function when the "Delete" button is clicked
}

//this component represents an individual task item.
//It includes buttons to complete and delete the task.

function TaskRow({ task }: TaskProps) {

  //state variable: if the task is completed or not.
  let [isCompleted, setIsCompleted] = useState(false);

  //this function used the state "isCompleted" and change
  //his value when the "Complete" button is clicked.
  const updateComplete = () => {
    setIsCompleted(!isCompleted);
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
            onClick={updateComplete}
          >
            {isCompleted ? "Undo" : "Complete"}
          </button>
          <button className="btn btn-danger" type="button">
            <BsTrash3Fill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskRow;
