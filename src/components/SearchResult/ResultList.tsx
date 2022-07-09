import React from "react";
import css from "./SearchResult.module.scss";
import { User } from "@prisma/client";
import UserResult from "./UserResult";

interface ResultListProps {
  users: User[];
}

const ResultList = ({ users }: ResultListProps) => {
  return (
    <div className={css["result__container"]}>
      {users.map((user) => (
        <UserResult key={user.id} user={user} />
      ))}
    </div>
  );
};

export default ResultList;
