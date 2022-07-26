import React, { useEffect, useRef, useState } from "react";
import css from "./styles/useEditable.module.scss";

export function useEditableCollection(
  array: string[]
): [
  ((index: number, editable: boolean) => JSX.Element)[],
  string[],
  () => void
] {
  const refs = useRef<any>([]);

  const reset = () => {
    setTexts(array);
  };

  const handleChange = (index: number, e: React.FormEvent<HTMLSpanElement>) => {
    e.preventDefault();
    let copy = [...texts];
    copy[index] = e.currentTarget.innerText;
    setTexts(copy);
  };

  const renderEditableField = (index: number, editable: boolean) => {
    return (
      <div className={css["editable-text__container"]}>
        <span
          ref={(e) => (refs.current[index] = e)}
          suppressContentEditableWarning
          onInput={(e) => handleChange(index, e)}
          className={editable ? css["editable"] : "uneditable"}
          contentEditable={editable}
        ></span>
      </div>
    );
  };

  const [editableCollection, setEditableCollection] = React.useState(() =>
    array.map(() => renderEditableField)
  );

  const [texts, setTexts] = useState(array);

  useEffect(() => {
    array.map((item, i) => {
      if (refs.current) {
        refs.current[i].innerText = item;
      }
    });
  }, []);

  useEffect(() => {
    setEditableCollection(() => texts.map(() => renderEditableField));
  }, [texts]);

  return [editableCollection, texts, reset];
}
