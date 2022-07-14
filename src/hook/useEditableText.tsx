import React, { useState } from "react";
import css from "./styles/useEditable.module.scss";

export function useEditableText(
  value: string | null,
  options?: string[]
): [(editable: boolean) => JSX.Element, string, () => void] {
  const [text, setText] = useState(value ? value : "");

  const reset = () => {
    setText(value ? value : "");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    setText(e.currentTarget.value);
  };

  const getEditableField = (editable: boolean) => {
    return options ? (
      <select
        value={text}
        onChange={handleChange}
        className={editable ? css["editable"] : css["uneditable"]}
      >
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    ) : (
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className={editable ? css["editable"] : css["uneditable"]}
      />
    );
  };

  const renderEditableField = (editable: boolean) => {
    return (
      <div className={css["editable-text__container"]}>
        {editable ? getEditableField(editable) : <span>{text}</span>}
      </div>
    );
  };

  return [renderEditableField, text, reset];
}
