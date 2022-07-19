import React, { useState } from "react";
import css from "./styles/useEditable.module.scss";

export function useEditableSelect(
  value: string | null,
  options: string[],
  keys?: string[]
): [(editable: boolean) => JSX.Element, string, () => void] {
  const [text, setText] = useState(value ? value : "");

  const reset = () => {
    setText(value ? value : "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setText(e.currentTarget.value);
  };

  const getEditableField = () => {
    return (
      <select value={text} onChange={handleChange} className={css["editable"]}>
        {options.map((option, index) => (
          <option key={index} value={keys ? keys[index] : option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  const renderEditableField = (editable: boolean) => {
    return (
      <div className={css["editable-text__container"]}>
        {editable ? getEditableField() : <span>{text}</span>}
      </div>
    );
  };

  return [renderEditableField, text, reset];
}
