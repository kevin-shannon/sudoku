import React, { useState } from "react";
import "./App.css";
import Grid from "./Grid.js";
import { solve } from "./DLX.js";
import { Error, HelpOutline } from "@material-ui/icons";
import Alert from "./Alert.js";
import { make2DFull } from "./utils.js";

function App() {
  const [grid2D, setGrid2D] = useState(make2DFull(""));
  const [alertMessage, setAlertMessage] = useState(
    "Tip: Use the arrow keys to quickly navigate between boxes!"
  );
  const [AlertType, setAlertType] = useState(HelpOutline);
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
      <Alert alertMessage={alertMessage} AlertType={AlertType} />
      <div className="button-row">
        <div className="button-cell">
          <button
            type="button"
            className="btn btn-lg"
            id="solve"
            onClick={() => {
              const { success, grid, error } = solve(grid2D);
              if (success) {
                setGrid2D(grid);
              } else {
                setAlertMessage(error);
                setAlertType(Error);
              }
              setFocusedBox({
                focusRow: -1,
                focusColumn: -1,
              });
            }}
          >
            Solve
          </button>
        </div>
        <div className="button-cell">
          <button
            type="button"
            className="btn btn-lg"
            id="clear"
            onClick={() => {
              let arr = make2DFull("");
              setGrid2D(arr);
              setAlertMessage("");
              setAlertType(Error);
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
      <hr />
      <footer>
        Sudoku Solver by&nbsp;
        <a href="https://kevinshannon.dev/">Kevin Shannon</a> <br />
        <a href="https://github.com/kevin-shannon/sudoku">View on Github</a>
      </footer>
    </div>
  );
}

export default App;
