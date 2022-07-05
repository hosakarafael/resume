import UserEntity from "../../models/UserEntity";
import User from "./User";
import css from "./User.module.scss";
import getAxios from "../../utils/getAxios";
import { useState } from "react";

interface UserListProps {
  users: UserEntity[];
}

const UserList = ({ users }: UserListProps) => {
  const axios = getAxios();
  const [usersState, setUsers] = useState<UserEntity[]>(users);

  const handleDelete = (user: UserEntity) => {
    axios.delete("/users/" + user.id);
    setUsers(usersState.filter((u) => u.id !== user.id));
  };

  return (
    <div className={css["user-list-container"]}>
      {usersState.map((user) => (
        <User key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default UserList;
