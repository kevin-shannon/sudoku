import React, { useRef, useEffect, useState } from "react";

function Grid({ grid2D, setGrid2D }) {
  // useState explained: https://reactjs.org/docs/hooks-state.html
  const [focusedBox, setFocusedBox] = useState({
    focusRow: -1,
    focusColumn: -1
  });

  return (
    <table cellSpacing="0">
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
          onKeyDown={e => handleKeys(e, i, j, setFocusedBox)}
          onChange={e => updateGrid(e, i, j, grid2D, setGrid2D)}
        />
      );
    }
    rows.push(<tr key={i}>{row}</tr>);
  }
  return rows;
}

function updateGrid(e, currentBoxX, currentBoxY, grid2D, setGrid2D) {
  grid2D[currentBoxX][currentBoxY] = e.target.value;
  console.log("FUCK", grid2D);
  setGrid2D(grid2D);
}

function Box({ focus, onKeyDown, onChange }) {
  const [inputRef, setInputFocus] = useFocus();

  useEffect(() => {
    if (focus) {
      setInputFocus();
    }
  }, [focus, setInputFocus]);

  return (
    <td>
      <input
        ref={inputRef}
        autoComplete="new-password"
        pattern="\d"
        type="number"
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
    </td>
  );
}

// taken from https://stackoverflow.com/a/54159564
const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };
  return [htmlElRef, setFocus];
};

const handleKeys = (e, currentBoxX, currentBoxY, setFocusedBox) => {
  const move = (x, y) => {
    e.preventDefault();
    setFocusedBox({
      focusRow: currentBoxX + x,
      focusColumn: currentBoxY + y
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
  } else if (e.which === 9 && !e.shiftKey) {
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
  } else if (e.which === 96) {
    // Block "0"
    e.preventDefault();
  } else if (e.which !== 8) {
    // Clear input otherwise if not backspace
    // as to guarantee change.
    e.target.value = "";
  }
};

function make2d(width) {
  var arr = [];
  for (let i = 0; i < 9; i++) {
    arr.push([]);
    for (let j = 0; j < 9; j++) {
      arr[i].push("");
    }
  }
  return arr;
}

export default Grid;
