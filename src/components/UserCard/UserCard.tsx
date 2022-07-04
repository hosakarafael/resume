import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import UserEntity, { fullName } from "../../models/UserEntity";

import css from "./UserCard.module.scss";

interface UserCardProps {
  user: UserEntity;
  imageUrl?: string;
}

const UserCard = ({ user, imageUrl }: UserCardProps) => {
  return (
    <div className={css["card__container"]}>
      <div className={css["card"]}>
        <div className={css["image__container"]}>
          <div className={css["edit-btn"]}>
            <FontAwesomeIcon icon={faCamera} size={"2x"} />
          </div>

          <img className={css["card-image"]} src={imageUrl} />
        </div>
        <div className={css["card-info"]}>
          <div className={css["card-header"]}>
            <div className={css["card-heading"]}>{fullName(user)}</div>
            <div className={css["card-sub-heading"]}>Web Developer</div>
          </div>
          <div className={css["card-body"]}>
            <span className={css["card-label"]}>AGE</span>
            <span className={css["card-data"]}>30</span>
            <span className={css["card-label"]}>ADDRESS</span>
            <span className={css["card-data"]}>some address</span>
            <span className={css["card-label"]}>E-MAIL</span>
            <span className={css["card-data"]}>{user.email}</span>
          </div>
        </div>
      </div>
      <div className={css["card-footer"]}>
        <div className={css["footer-item"]}>
          <div className={css["secondary-title"]}>Education</div>
          <ul>
            <li>Computer Science - Bachelor</li>
          </ul>
        </div>

        <div className={css["footer-item"]}>
          <div className={css["secondary-title"]}>Work Experience</div>
          <ul>
            <li>Foton</li>
          </ul>
        </div>
        <div className={css["footer-item"]}>
          <div className={css["secondary-title"]}>Skills</div>
          <ul>
            <li>Java</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
