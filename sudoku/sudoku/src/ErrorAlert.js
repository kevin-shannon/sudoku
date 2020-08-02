import React from "react";
import { Error } from "@material-ui/icons";

function ErrorAlert({ children }) {
  return (
    <div className="alert alert-light">
      {children && (
        <Error
          style={{ fontSize: "1.5em", position: "relative", top: ".25em" }}
        />
      )}
      <div className="error-text">{children}</div>
    </div>
  );
}

export default ErrorAlert;
