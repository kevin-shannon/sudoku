import React from "react";
import Box from "./Box.js";

function Grid({ grid2D, setGrid2D, focusedBox, setFocusedBox }) {
  return (
    <table>
      <tbody>{displayGrid(focusedBox, setFocusedBox, grid2D, setGrid2D)}</tbody>
    </table>
  );
}

function displayGrid(
  { focusRow, focusColumn },
  setFocusedBox,
  grid2D,
  setGrid2D
) {
  let rows = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      const focus = focusRow === i && focusColumn === j;
      row.push(
        <Box
          key={i + "" + j}
          focus={focus}
          onKeyDown={(e) => handleKeys(e, i, j, setFocusedBox)}
          onChange={(e) => updateGrid(e, i, j, grid2D, setGrid2D)}
          value={grid2D[i][j]}
          setFocusedBox={() =>
            setFocusedBox({
              focusRow: i,
              focusColumn: j,
            })
          }
        />
      );
    }
    rows.push(<tr key={i}>{row}</tr>);
  }
  return rows;
}

function updateGrid(e, currentBoxX, currentBoxY, grid2D, setGrid2D) {
  grid2D[currentBoxX][currentBoxY] = e.target.value;
  setGrid2D(grid2D.slice());
}

const handleKeys = (e, currentBoxX, currentBoxY, setFocusedBox) => {
  const move = (x, y) => {
    e.preventDefault();
    setFocusedBox({
      focusRow: currentBoxX + x,
      focusColumn: currentBoxY + y,
    });
  };

  if (e.which === 39) {
    // Right Arrow
    move(0, 1);
  } else if (e.which === 37) {
    // Left Arrow
    move(0, -1);
  } else if (e.which === 38) {
    // Up Arrow
    move(-1, 0);
  } else if (e.which === 40) {
    // Down Arrow
    move(1, 0);
  } else if ((e.which === 9 && !e.shiftKey) || e.which === 13) {
    // Tab (go right)
    if (currentBoxY === 8) {
      move(1, -8);
    } else {
      move(0, 1);
    }
  } else if (e.which === 9 && e.shiftKey) {
    // Shift + Tab (go left)
    if (currentBoxY === 0) {
      move(-1, 8);
    } else {
      move(0, -1);
    }
  } else if (
    e.which === 96 ||
    e.which === 46 ||
    e.which === 48 ||
    e.which === 69 ||
    e.which === 107 ||
    e.which === 109 ||
    e.which === 110 ||
    e.which === 187 ||
    e.which === 189 ||
    e.which === 190
  ) {
    // Block "0"
    e.preventDefault();
  } else if (e.which !== 8) {
    // Clear input otherwise if not backspace
    // as to guarantee change.
    e.target.value = "";
  }
};

export default Grid;
