import React from "react";
import css from "./InfoTable.module.scss";

interface InfoItemProps {
  children?: (JSX.Element | string) | (JSX.Element | string)[];
}

const InfoItem = ({ children }: InfoItemProps) => {
  return (
    <span className={css["info-item"]}>
      {children}
    </span>
  );
};

export default InfoItem;
