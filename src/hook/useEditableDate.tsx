import React, { useState } from "react";
import { DAYS, formatDate, MONTHS, YEARS } from "../utils/dateUtils";
import css from "./styles/useEditable.module.scss";

export function useEditableDate(
  value: Date | null
): [(editable: boolean) => JSX.Element, Date, () => void] {
  const [date, setDate] = useState(value ? new Date(value) : new Date());

  const reset = () => {
    setDate(value ? new Date(value) : new Date());
  };

  const getEditableField = () => {
    return (
      <>
        <div className={css["editable-text__container"]}>
          <select
            value={date.getMonth()}
            onChange={(e) =>
              setDate(new Date(date.setMonth(parseInt(e.currentTarget.value))))
            }
            className={css["editable"]}
          >
            {MONTHS.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className={css["editable-text__container"]}>
          <select
            value={date.getDate()}
            onChange={(e) =>
              setDate(new Date(date.setDate(parseInt(e.currentTarget.value))))
            }
            className={css["editable"]}
          >
            {DAYS.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className={css["editable-text__container"]}>
          <select
            value={date.getFullYear()}
            onChange={(e) =>
              setDate(
                new Date(date.setFullYear(parseInt(e.currentTarget.value)))
              )
            }
            className={css["editable"]}
          >
            {YEARS.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  };

  const renderEditableField = (editable: boolean) => {
    return (
      <>{editable ? getEditableField() : <span>{formatDate(date)}</span>}</>
    );
  };

  return [renderEditableField, date, reset];
}
