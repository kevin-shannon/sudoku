import React, { useState } from "react";
import "./App.css";
import Grid from "./Grid.js";
import { solve } from "./DLX.js";
import ErrorAlert from "./ErrorAlert.js";
import { make2DFull } from "./utils.js";

function App() {
  const [grid2D, setGrid2D] = useState(make2DFull(""));
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedBox, setFocusedBox] = useState({
    focusRow: -1,
    focusColumn: -1,
  });
  return (
    <div className="App">
      <h1>Sudoku Solver</h1>
      <div id="table-container">
        <Grid
          grid2D={grid2D}
          setGrid2D={setGrid2D}
          focusedBox={focusedBox}
          setFocusedBox={setFocusedBox}
        />
      </div>
      <ErrorAlert>{errorMessage}</ErrorAlert>
      <div className="button-row">
        <button
          type="button"
          className="btn btn-lg"
          id="solve"
          onClick={() => {
            const { success, grid, error } = solve(grid2D);
            if (success) setGrid2D(grid);
            else setErrorMessage(error);
          }}
        >
          Solve
        </button>
        <button
          type="button"
          className="btn btn-lg"
          id="clear"
          onClick={() => {
            let arr = make2DFull("");
            setGrid2D(arr);
            setErrorMessage("");
            setFocusedBox({
              focusRow: -1,
              focusColumn: -1,
            });
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;
