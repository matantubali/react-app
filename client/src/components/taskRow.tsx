import React, { ReactNode, useState, useEffect } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import axios from "axios";

interface TaskProps {
  id: string; //the id of the task in the database
  taskDesc: string; //the text of the task
  isDone: Boolean; //false -> if not done, true -> if done
}

//this component represents an individual task item.
//It includes buttons to complete and delete the task.

const TaskRow = ({ id, isDone, taskDesc }: TaskProps) => {
  //this function used the prop "isCompleted" and change
  //his value when the "Complete" button is clicked.
  //change the value in the database by the id of the task.

  const updateComplete = (userId: string) => {
    axios
      .put("http://localhost:3001/" + userId)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  //the function delete the task by pressing the "delete" button
  //according to the id prop of the task
  const deleteTask = (userId: string) => {
    axios
      .delete("http://localhost:3001/" + userId)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    //className: Applies different styles based on the "isCompleted"
    //value, and giving a green background for the completed task.
    <div
      className={`form-control border p-3 mt-3 ${
        isDone ? " text-bg-success" : ""
      }`}
    >
      <div className="gap-2 d-md-flex">
        <span
          className={`form-control${
            isDone ? " text-decoration-line-through " : ""
          }`}
        >
          {taskDesc}
        </span>
        <div className="gap-2 d-md-flex justify-content-md-end">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => updateComplete(id)}
          >
            {isDone ? "Undone" : "Done"}
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
};

export default TaskRow;