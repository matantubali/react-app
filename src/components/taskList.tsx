import React, { Fragment } from "react";
import TaskRow from "./taskRow";

interface TaskListProps {
  tasks: any[]; //prop: Array of task objects
}

//this component represent the list of tasks. 
// It iterates through tasks and renders each task using 
//the TaskRow component.

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <>
      {tasks.length === 0 && <p className="mt-5">No tasks found...</p>}
      <ul className="list-group">
        {tasks.map((task) => (
          <TaskRow
            id={task._id}
            isCompleted={task.done}
            task={task.task}
          />
        ))}
      </ul>
    </>
  );
};
//change
export default TaskList;
