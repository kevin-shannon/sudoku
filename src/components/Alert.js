import React from "react";

function Alert({ alertMessage, AlertType }) {
  return (
    <div className="alert alert-light">
      {alertMessage && (
        <AlertType
          style={{ fontSize: "1.5em", verticalAlign: "top", minWidth: "5%" }}
        />
      )}
      <div className="alert-text">{alertMessage}</div>
    </div>
  );
}

export default Alert;
