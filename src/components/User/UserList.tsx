import UserEntity from "../../models/UserEntity";
import User from "./User";
import css from "./User.module.scss";
import useAxios from "../../hook/useAxios";
import { useState } from "react";

interface UserListProps {
  users: UserEntity[];
}

const UserList = ({ users }: UserListProps) => {
  const axios = useAxios();
  const [usersState, setUsers] = useState<UserEntity[]>(users);

  const handleDelete = (user: UserEntity) => {
    axios.delete("/users/" + user._id);
    setUsers(usersState.filter((u) => u._id !== user._id));
  };

  return (
    <div className={css["user-list-container"]}>
      {usersState.map((user) => (
        <User key={user._id} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default UserList;