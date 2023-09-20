import React from "react";

function MessageBox(props) {
  return <div className="alert danger">{props.children}</div>;
}

export default MessageBox;
