import React, { Fragment } from "react";
import TaskRow from "./taskRow";

interface TaskListProps {
  //tasks: { id: number; text: string }[]; //prop: Array of task objects
  tasks: any[]; //prop: Array of task objects
  //onDeleteTask: (taskId: number) => void; //prop: function to delete a task, which is passed to the "TaskRow" component.
}

//this component represent the list of tasks. 
// It iterates through tasks and renders each task using 
//the Task component.

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <>
      {tasks.length === 0 && <p className="mt-5">No tasks found...</p>}
      <ul className="list-group">
        {tasks.map((task) => (
          <TaskRow
            //key={task}
            task={task.task}
            //onDelete={() => onDeleteTask(task.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default TaskList;
