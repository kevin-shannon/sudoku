import React, { useRef, useEffect } from "react";

function Grid() {
  return (
    <table>
      <tbody>{displayGrid(1, 3)}</tbody>
    </table>
  );
}

function displayGrid(focusRow, focusColumn) {
  let rows = [];
  for (var i = 0; i < 9; i++) {
    let row = [];
    for (var j = 0; j < 9; j++) {
      const focus = focusRow === i && focusColumn === j;
      console.log(focus, i, j, focusRow, focusColumn);
      row.push(<Box key={i + "" + j} focus={focus} />);
    }
    rows.push(<tr key={i}>{row}</tr>);
  }
  return rows;
}

function Box({ focus }) {
  const [inputRef, setInputFocus] = useFocus();

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
        maxLength="1"
      />
    </td>
  );
}

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };
  return [htmlElRef, setFocus];
};

export default Grid;
