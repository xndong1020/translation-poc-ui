import { Button } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

const Message = ({ message }: { message: any }) => {
  let content: JSX.Element = <div></div>;
  if (message.functionName === "createNewTask") {
    const task = JSON.parse(message.payload);
    content = (
      <div>
        <h4>New Task received: {task.id}</h4>
        <NavLink to={`/translator/tasks/${task.id}`} component={Button}>
          Go to the new task
        </NavLink>
      </div>
    );
  } else if (message.functionName === "lockTask") {
    const task = JSON.parse(message.payload);
    content = (
      <div>
        <h4>Task id {task.taskId} is locked by admin.</h4>
      </div>
    );
  }
  return <div>{content}</div>;
};

export default Message;
