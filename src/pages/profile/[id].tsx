import { PrismaClient, User } from "@prisma/client";
import { GetServerSideProps } from "next";
import React from "react";
import UserCard from "../../components/UserCard/UserCard";
import { isAuthenticatedRequest } from "../../utils/authentication";
import { s3downloadFile } from "../../utils/s3";
import css from "./profile.module.scss";

interface ProfileProps {
  user: User | null;
  imageUrl: string;
}

const Profile = ({ user, imageUrl }: ProfileProps) => {
  return (
    <div className={css["profile__container"]}>
      {user && <UserCard user={user} imageUrl={imageUrl} />}
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
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { id: id } });
  let imageUrl = "";
  if (user?.fileName) {
    try {
      imageUrl = await s3downloadFile(`users/${id}`, user.fileName);
    } catch (error) {
      imageUrl = "/images/no-picture.jpeg";
    }
  } else {
    imageUrl = "/images/no-picture.jpeg";
  }
  return { props: { user, imageUrl } };
};

export default Profile;
