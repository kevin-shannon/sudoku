import React, { useRef, useEffect, useState } from "react";

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
  }, [setHeight]);

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
        style={{ fontSize: height / 1.6 }}
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

export default Box;
