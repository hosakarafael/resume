import {
  faAddressCard,
  faImagePortrait,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import css from "./SearchResult.module.scss";
import { User } from "@prisma/client";
import { fullName } from "../../models/UserEntity";
import getAxios from "../../utils/getAxios";
import Spinner from "../Spinner/Spinner";
import Image from "next/image";
import DivWithToolTip from "../ToolTip/DivWithToolTip";

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
        <div className={css["name__container"]}>
          <span className={css["result-name"]}>{fullName(user)}</span>
          <span>{user.title}</span>
        </div>
      </div>
      <div className={css["btn-area"]}>
        <DivWithToolTip tooltipLabel="Show Card">
          <Link href={`/profile/${user.id}`}>
            <a className={`btn btn--primary`}>
              <FontAwesomeIcon
                icon={faAddressCard}
                size={"2x"}
                className={css["profile-btn"]}
              />
            </a>
          </Link>
        </DivWithToolTip>
        <DivWithToolTip tooltipLabel="Show Resume">
          <Link href={`/profile/${user.id}/detail`}>
            <a className={`btn btn--primary`}>
              <FontAwesomeIcon
                icon={faImagePortrait}
                size={"2x"}
                className={css["profile-btn"]}
              />
            </a>
          </Link>
        </DivWithToolTip>
      </div>
    </div>
  );
};

export default UserResult;
