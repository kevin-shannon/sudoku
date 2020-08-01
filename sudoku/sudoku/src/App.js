import React from "react";
import "./App.css";
import Grid from "./Grid.js";

function App() {
  return (
    <div className="App">
      <h1>Sudoku Solver</h1>
      <div id="table-container">
        <Grid />
      </div>
      <div style={{ visibility: "hidden" }} className="alert alert-light">
        <div className="error-icon">
          <i className="material-icons">&#xe000;</i>
        </div>
        <div className="error-text">Uh-oh! test error message.</div>
      </div>
      <div className="button-row">
        <button type="button" className="btn btn-lg" id="solve">
          Solve
        </button>
        <button type="button" className="btn btn-lg" id="clear">
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;
