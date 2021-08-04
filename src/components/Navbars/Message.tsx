import { Button } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

const Message = ({ message }: { message: any }) => {
  return (
    <div>
      <h4>New Task received: {message}</h4>
      <NavLink to={`/translator/tasks/${message}`} component={Button}>
        Go to the new task
      </NavLink>
    </div>
  );
};

export default Message;
