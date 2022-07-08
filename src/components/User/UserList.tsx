import css from "./User.module.scss";
import getAxios from "../../utils/getAxios";
import { useState } from "react";
import { User } from "@prisma/client";
import UserItem from "./UserItem";

interface UserListProps {
  users: User[] | null;
}

const UserList = ({ users }: UserListProps) => {
  const axios = getAxios();
  const [usersState, setUsers] = useState<User[] | null>(users);

  const handleDelete = (user: User) => {
    if (usersState) {
      axios.delete("/users/" + user.id);
      setUsers(usersState.filter((u) => u.id !== user.id));
    }
  };

  return (
    <div className={css["user-list-container"]}>
      {usersState &&
        usersState.map((user) => (
          <UserItem key={user.id} user={user} onDelete={handleDelete} />
        ))}
    </div>
  );
};

export default UserList;
