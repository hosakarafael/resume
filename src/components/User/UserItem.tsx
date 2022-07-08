import React from "react";
import css from "./User.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { User } from "@prisma/client";

interface UserItemProps {
  user: User;
  onDelete: (user: User) => void;
}

const UserItem = ({ user, onDelete }: UserItemProps) => {
  return (
    <div className={css["user-container"]}>
      <div className={css["header"]}>
        <h1 className={css["user-name"]}>{user.firstName}</h1>
      </div>
      <div className={css["footer"]}>
        <button className="btn btn--primary" onClick={() => onDelete(user)}>
          <FontAwesomeIcon icon={faTrash} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserItem;
