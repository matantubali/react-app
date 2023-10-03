import React, { Fragment } from "react";
import TaskRow from "./taskRow";
import { TaskDocument } from "../App";

interface TaskListProps {
  tasks: TaskDocument[]; 
}

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <>
      {tasks.length === 0 && <p className="mt-5">No tasks found...</p>}
      <ul className="list-group">
        {tasks.map((task) => (
          <TaskRow id={task._id} isDone={task.done} taskDesc={task.taskDesc} />
        ))}
      </ul>
    </>
  );
};

export default TaskList;
