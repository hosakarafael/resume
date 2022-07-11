import React from "react";
import css from "./InfoTable.module.scss";

interface InfoTableProps {
  white?: boolean;
  grid?: boolean;
  title: string;
  children: JSX.Element | JSX.Element[];
}

const InfoTable = ({
  white = false,
  grid = false,
  children,
  title,
}: InfoTableProps) => {
  return (
    <div className={white ? css["info--white"] : css["info"]}>
      <div className={css["info-header"]}>
        <span>{title}</span>
      </div>
      <div className={grid ? css["info-grid"] : ""}>{children}</div>
    </div>
  );
};

export default InfoTable;
