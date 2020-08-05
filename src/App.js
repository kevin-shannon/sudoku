import React, { useState } from "react";
import "./App.css";
import Grid from "./Grid.js";
import { solve } from "./DLX.js";
import { Error, HelpOutline, Info } from "@material-ui/icons";
import Alert from "./Alert.js";
import { make2DFull } from "./utils.js";
import Modal from "react-modal";

function App() {
  const [grid2D, setGrid2D] = useState(make2DFull(""));
  const [alertMessage, setAlertMessage] = useState(
    "Tip: Use the arrow keys to quickly navigate between boxes!"
  );
  const [AlertType, setAlertType] = useState(HelpOutline);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [focusedBox, setFocusedBox] = useState({
    focusRow: -1,
    focusColumn: -1,
  });

  return (
    <div className="App" id="root">
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
        <div className="alert-text">
          Sudoku Solver by&nbsp;
          <a href="https://kevinshannon.dev/">Kevin Shannon</a> <br />
          <a href="https://github.com/kevin-shannon/sudoku">View on Github</a>
        </div>
        <Info className="info-icon" onClick={() => setIsOpen(true)} />
      </footer>
      <Modal
        className="info-modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Info Modal"
      >
        <h3 style={{ textAlign: "center" }}>About Sudoku Solver</h3>
        <p>
          Welcome to Sudoku Solver{" "}
          <span role="img" aria-label="robot">
            🤖
          </span>{" "}
          A website that, as the name implies, will solve any Sudoku in just
          milliseconds! This is achieved by using{" "}
          <a href="https://en.wikipedia.org/wiki/Knuth%27s_Algorithm_X">
            Knuth's Algorithm X
          </a>{" "}
          to solve a Sudoku as an{" "}
          <a href="https://en.wikipedia.org/wiki/Exact_cover">exact cover</a>{" "}
          problem. To input your puzzle you can either click around, or use the
          arrow, tab, and enter keys. When you're done use "solve" or if you
          want to start over use "clear".
        </p>
      </Modal>
    </div>
  );
}

Modal.setAppElement("#root");

export default App;
