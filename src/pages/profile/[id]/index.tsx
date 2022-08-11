import { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import React from "react";
import UserCard from "../../../components/UserCard/UserCard";
import { useUserContext } from "../../../context/userContext";
import { getUserImage } from "../../../models/UserEntity";
import { UserPersonalDataService } from "../../../service/userService";
import css from "./profile.module.scss";
import { REDIRECT_REQUEST_LOGOUT } from "../../logout/index";

interface ProfileProps {
  user: User | null;
  imageUrl: string;
}

const Profile = ({ user, imageUrl }: ProfileProps) => {
  const { user: currentUser } = useUserContext();

  return (
    <div className={css["profile__container"]}>
      {user && (
        <UserCard
          user={user}
          imageUrl={imageUrl}
          editable={currentUser?.id === user.id}
        />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ProfileProps | {}> = async (
  context
) => {
  const id = context.query.id as string;

  if (id === "undefined") {
    return REDIRECT_REQUEST_LOGOUT;
  }

  const result = await UserPersonalDataService.findById(id);

  const user = JSON.parse(JSON.stringify(result));
  const imageUrl = await getUserImage(user);

  return { props: { user, imageUrl } };
};

export default Profile;
