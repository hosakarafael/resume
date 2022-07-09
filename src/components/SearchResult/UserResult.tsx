import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import css from "./SearchResult.module.scss";
import { User } from "@prisma/client";
import { fullName } from "../../models/UserEntity";
import getAxios from "../../utils/getAxios";
import Spinner from "../Spinner/Spinner";
import Image from "next/image";

interface UserResultProps {
  user: User;
}

const UserResult = ({ user }: UserResultProps) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function getImage() {
      const { data } = await getAxios().get(`/users/${user.id}/download`);
      setImageUrl(data);
    }
    getImage();
  }, [user]);

  return (
    <div className={css["result"]}>
      <div className={css["user-data"]}>
        <Spinner sizeClass="size--80" show={imageUrl.length === 0}>
          <Image
            className={css["result-image"]}
            src={imageUrl}
            width={80}
            height={80}
          />
        </Spinner>
        <span className={css["result-name"]}>{fullName(user)}</span>
      </div>
      <Link href={`/profile/${user.id}`}>
        <a className={`btn btn--primary`}>
          <FontAwesomeIcon
            icon={faAddressCard}
            size={"2x"}
            className={css["profile-btn"]}
          />
        </a>
      </Link>
    </div>
  );
};

export default UserResult;
