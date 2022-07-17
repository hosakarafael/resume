import React, { useEffect, useRef, useState } from "react";
import css from "./styles/useEditable.module.scss";

export function useEditableText(
  value: string | null
): [(editable: boolean) => JSX.Element, string, () => void] {
  const [text, setText] = useState(value ? value : "");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (value && ref.current?.innerText != undefined) {
      ref.current.innerText = value;
    }
  }, []);

  const reset = () => {
    setText(value ? value : "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    e.preventDefault();
    setText(e.currentTarget.innerText);
  };

  const renderEditableField = (editable: boolean) => {
    return (
      <div className={css["editable-text__container"]}>
        <span
          ref={ref}
          suppressContentEditableWarning
          onInput={handleChange}
          className={editable ? css["editable"] : ""}
          contentEditable={editable}
        ></span>
      </div>
    );
  };

  return [renderEditableField, text, reset];
}