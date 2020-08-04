import React from "react";
import { Error, HelpOutline } from "@material-ui/icons";

function Alert({ alertMessage, alertType }) {
  return (
    <div className="alert alert-light">
      {alertMessage && alertType === HelpOutline && (
        <HelpOutline
          style={{ fontSize: "1.5em", verticalAlign: "top", minWidth: "5%" }}
        />
      )}
      {alertMessage && alertType === Error && (
        <Error
          style={{ fontSize: "1.5em", verticalAlign: "top", minWidth: "5%" }}
        />
      )}
      <div className="error-text">{alertMessage}</div>
    </div>
  );
}

export default Alert;
