import { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import React from "react";
import UserCard from "../../../components/UserCard/UserCard";
import { useUserContext } from "../../../context/userContext";
import { getUserImage } from "../../../models/UserEntity";
import { UserPersonalDataService } from "../../../service/userService";
import { isAuthenticatedRequest } from "../../../utils/authentication";
import css from "./profile.module.scss";

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
  if (!isAuthenticatedRequest(context.req)) {
    return {
      redirect: { destination: "/login", permanent: false },
      props: {},
    };
  }
  const id = context.query.id as string;

  const user = await UserPersonalDataService.findById(id);
  const imageUrl = await getUserImage(user);

  return { props: { user, imageUrl } };
};

export default Profile;
