import React, { ReactNode, useState, useEffect } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import axios from "axios";

interface TaskProps {
  id: string;
  taskDesc: string; 
  isDone: Boolean;
}

const TaskRow = ({ id, isDone, taskDesc }: TaskProps) => {

  const updateComplete = (userId: string) => {
    axios
      .put("http://localhost:3001/" + userId)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  const deleteTask = (userId: string) => {
    axios
      .delete("http://localhost:3001/" + userId)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    
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
