import React, { useState } from "react";

export function useEditable(
  value: string
): [(editable: boolean) => JSX.Element, string] {
  const [text, setText] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.currentTarget.value);
  };

  const renderEditableField = (editable: boolean) => {
    return editable ? (
      <input
        type="text"
        size={value.length}
        value={text}
        onChange={handleChange}
      />
    ) : (
      <span>{text}</span>
    );
  };

  return [renderEditableField, text];
}
