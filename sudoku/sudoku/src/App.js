import React, { useState } from "react";
import "./App.css";
import Grid from "./Grid.js";
import { solve } from "./DLX.js";

function App() {
  const [grid2D, setGrid2D] = useState(make2D());
  return (
    <div className="App">
      <h1>Sudoku Solver</h1>
      <div id="table-container">
        <Grid grid2D={grid2D} setGrid2D={setGrid2D} />
      </div>
      <div style={{ visibility: "hidden" }} className="alert alert-light">
        <div className="error-icon">
          <i className="material-icons">&#xe000;</i>
        </div>
        <div className="error-text">Uh-oh! test error message.</div>
      </div>
      <div className="button-row">
        <button
          type="button"
          className="btn btn-lg"
          id="solve"
          onClick={() => {
            let sol = solve(grid2D);
            setGrid2D(sol.grid);
          }}
        >
          Solve
        </button>
        <button type="button" className="btn btn-lg" id="clear">
          Clear
        </button>
      </div>
    </div>
  );
}

function make2D(width) {
  var arr = [];
  for (let i = 0; i < 9; i++) {
    arr.push([]);
    for (let j = 0; j < 9; j++) {
      arr[i].push("");
    }
  }
  return arr;
}

export default App;
