import React, { useRef, useEffect, useState } from "react";

function Grid({ grid2D, setGrid2D, focusedBox, setFocusedBox }) {
  // useState explained: https://reactjs.org/docs/hooks-state.html

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

function Box({ focus, onKeyDown, onChange, value, setFocusedBox }) {
  const [inputRef, setInputFocus] = useFocus();
  const [height, setHeight] = useState(0);
  const tdRef = useRef(null);

  useEffect(() => {
    if (focus) {
      setInputFocus();
    }
  }, [focus, setInputFocus]);

  useEffect(() => {
    setHeight(tdRef.current.clientHeight);
  });

  return (
    <td ref={tdRef}>
      <input
        ref={inputRef}
        autoComplete="new-password"
        pattern="\d"
        type="number"
        onKeyDown={onKeyDown}
        onChange={onChange}
        value={value}
        onClick={setFocusedBox}
        style={{ fontSize: height / 1.8 }}
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

export default Grid;
