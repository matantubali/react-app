import React, { ReactNode, useState, useEffect } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import axios from "axios";

interface TaskProps {
  id: string; //the id of the task in the database
  task: string; //the text of the task
  isCompleted: Boolean; //false -> if not done, true -> if done
}

//this component represents an individual task item.
//It includes buttons to complete and delete the task.

function TaskRow({ id, isCompleted, task }: TaskProps) {

  //this function used the prop "isCompleted" and change
  //his value when the "Complete" button is clicked.
  //change the value in the database by the id of the task.

  const updateComplete = (userid: string) => {
    axios
      .put("http://localhost:3001/" + userid)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  //the function delete the task by pressing the "delete" button
  //according to the id prop of the task
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
    //value, and giving a green background for the completed task.
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
