import React from "react";
import UserCard from "../../components/UserCard/UserCard";
import UserEntity from "../../models/UserEntity";
import getAxios from "../../utils/getAxios";
import css from "./profile.module.scss";

interface ProfileProps {
  user: UserEntity;
}

const Profile = ({ user }: ProfileProps) => {
  return (
    <div className={css["profile__container"]}>
      <UserCard user={user} />
    </div>
  );
};

Profile.getInitialProps = async () => {
  const axios = getAxios();

  const { data } = await axios.get("/users/62c046edf44eb5d2c122785d");

  return { user: new UserEntity(data) };
};

export default Profile;
