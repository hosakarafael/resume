import React, { useEffect, useState } from "react";
import css from "./styles/useEditable.module.scss";

export function useEditableCollection(
  array: string[],
  textarea = false
): [
  ((index: number, editable: boolean) => JSX.Element)[],
  string[],
  () => void
] {
  function textAreaAdjust(element: HTMLTextAreaElement) {
    element.style.height = "1px";
    element.style.height = 25 + element.scrollHeight + "px";
  }

  const reset = () => {
    setTexts(array);
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    let copy = [...texts];
    copy[index] = e.target.value;
    setTexts(copy);
    if (e.currentTarget instanceof HTMLTextAreaElement) {
      textAreaAdjust(e.currentTarget);
    }
  };

  const getEditableField = (index: number) => {
    return textarea ? (
      <textarea
        id="editable_textarea"
        value={texts[index]}
        onChange={(e) => handleChange(index, e)}
        className={css["editable"]}
      />
    ) : (
      <input
        type="text"
        value={texts[index]}
        onChange={(e) => handleChange(index, e)}
        className={css["editable"]}
      />
    );
  };

  const renderEditableField = (index: number, editable: boolean) => {
    return (
      <div className={css["editable-text__container"]}>
        {editable ? getEditableField(index) : <span>{texts[index]}</span>}
      </div>
    );
  };

  const [editableCollection, setEditableCollection] = React.useState(() =>
    array.map(() => renderEditableField)
  );
  const [texts, setTexts] = useState(array);

  useEffect(() => {
    setEditableCollection(() => texts.map(() => renderEditableField));
  }, [texts]);

  return [editableCollection, texts, reset];
}
