import React, { useState } from "react";
import css from "./styles/useEditable.module.scss";

export function useEditableTextArea(
  value: string | null
): [(editable: boolean) => JSX.Element, string, () => void] {
  const [text, setText] = useState(value ? value : "");

  function textAreaAdjust(element: HTMLTextAreaElement) {
    element.style.height = "1px";
    element.style.height = 25 + element.scrollHeight + "px";
  }

  const reset = () => {
    setText(value ? value : "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    textAreaAdjust(e.currentTarget);
    setText(e.currentTarget.value);
  };

  const getEditableField = () => {
    return (
      <textarea
        id="editable_textarea"
        value={text}
        onChange={handleChange}
        className={css["editable"]}
      />
    );
  };

  const renderEditableField = (editable: boolean) => {
    return (
      <div className={css["editable-text__container"]}>
        {editable ? (
          getEditableField()
        ) : (
          <span className={css["uneditable"]}>{text}</span>
        )}
      </div>
    );
  };

  return [renderEditableField, text, reset];
}
