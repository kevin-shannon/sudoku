import React, { useRef, useEffect, useState } from "react";

function Grid() {
  // useState explained: https://reactjs.org/docs/hooks-state.html
  const [focusedBox, setFocusedBox] = useState({
    focusRow: -1,
    focusColumn: -1
  });

  return (
    <table>
      <tbody>{displayGrid(focusedBox, setFocusedBox)}</tbody>
    </table>
  );
}

function displayGrid({ focusRow, focusColumn }, setFocusedBox) {
  let rows = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      const focus = focusRow === i && focusColumn === j;
      row.push(
        <Box
          key={i + "" + j}
          focus={focus}
          onKeyDown={e => handleArrowKey(e, i, j, setFocusedBox)}
        />
      );
    }
    rows.push(<tr key={i}>{row}</tr>);
  }
  return rows;
}

function Box({ focus, onKeyDown }) {
  // useFocus is an example of a "custom" react hook.
  // The two most common built-in hooks are probably
  // useState and useEffect.
  const [inputRef, setInputFocus] = useFocus();

  // This function will run whenever focus changes,
  // but only after the component is first rendered.
  // Essentially, the reason the input was not focusing
  // because it wasn't rendered yet, and thus didn't
  // exist and couldn't be focused.
  // more info on useEffect: https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    if (focus) {
      setInputFocus();
    }
  }, [focus]);

  return (
    <td>
      <input
        ref={inputRef}
        autoComplete="new-password"
        tabIndex="1"
        pattern="\d"
        type="number"
        onInput={e => {
          if (e.target.value.length > 1) {
            // example: if they enter 3 then 5, the value
            // will be "35". slice takes just the 5 and
            // sets that as the new value
            e.target.value = e.target.value.slice(1, 2);
          }
        }}
        onKeyDown={onKeyDown}
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

const handleArrowKey = (e, currentBoxX, currentBoxY, setFocusedBox) => {
  const move = (x, y) => {
    e.preventDefault();
    setFocusedBox({
      focusRow: currentBoxX + x,
      focusColumn: currentBoxY + y
    });
  };

  if (e.which == 39) {
    // Right Arrow
    move(0, 1);
  } else if (e.which == 37) {
    // Left Arrow
    move(0, -1);
  } else if (e.which == 38) {
    // Up Arrow
    move(-1, 0);
  } else if (e.which == 40) {
    // Down Arrow
    move(1, 0);
  } else if (e.which == 13 || e.which == 32) {
    // Enter or Spacebar - edit cell
  } else if (e.which == 9 && !e.shiftKey) {
    // Tab (go right)
    // TODO: go to next row if in last box in row
    move(0, 1);
  } else if (e.which == 9 && e.shiftKey) {
    // Shift + Tab (go left)
    // TODO: ditto above
    move(0, -1);
  }
};

export default Grid;
