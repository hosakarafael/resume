import { NextPageContext } from "next";
import React from "react";
import UserCard from "../../components/UserCard/UserCard";
import UserEntity from "../../models/UserEntity";
import getAxios from "../../utils/getAxios";
import css from "./profile.module.scss";

interface ProfileProps {
  user: UserEntity;
  imageUrl: string;
}

const Profile = ({ user, imageUrl }: ProfileProps) => {
  return (
    <div className={css["profile__container"]}>
      <UserCard user={user} imageUrl={imageUrl} />
    </div>
  );
};

Profile.getInitialProps = async ({ query }: NextPageContext) => {
  const axios = getAxios();

  const { data: user } = await axios.get(`/users/${query.id}`);

  const imageUrl = await axios.get(`/users/${query.id}/download`);

  return { user, imageUrl: imageUrl.data };
};

export default Profile;
