import { faCamera, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";
import axios from "axios";
import Router from "next/router";
import React from "react";
import { fullName } from "../../models/UserEntity";
import getAxios from "../../utils/getAxios";

import css from "./UserCard.module.scss";
import Image from "next/image";
import DivWithToolTip from "../ToolTip/DivWithToolTip";

interface UserCardProps {
  user: User;
  imageUrl: string;
  editable?: boolean;
}

const UserCard = ({ user, imageUrl, editable = false }: UserCardProps) => {
  const handleUpload = async (e: React.FormEvent) => {
    const element = e.target;

    if (element instanceof HTMLInputElement) {
      const files = element.files;

      if (files) {
        const { data } = await getAxios().post(`/users/${user.id}/upload`, {
          name: files[0].name,
          type: files[0].type,
        });
        await axios.put(data, files[0]);
        Router.push(`/profile/${user.id}`);
      }
    }
  };

  return (
    <div className={css["card__container"]}>
      <div className={css["card"]}>
        <div className={css["image__container"]}>
          {editable && (
            <label
              className={css["edit-image__container"]}
              htmlFor="upload-photo"
            >
              <DivWithToolTip
                className={css["edit-image"]}
                tooltipLabel="Change photo"
              >
                <FontAwesomeIcon icon={faCamera} size={"2x"} />
                <input
                  id="upload-photo"
                  type="file"
                  onChange={(e) => handleUpload(e)}
                />
              </DivWithToolTip>
            </label>
          )}

          <Image
            className={css["card-image"]}
            src={imageUrl}
            width={300}
            height={300}
            layout={"fixed"}
          />
        </div>
        <div className={css["card-info"]}>
          <div className={css["card-header"]}>
            <div className={css["card-heading"]}>
              {fullName(user)}
              <DivWithToolTip tooltipLabel="Details">
                <FontAwesomeIcon
                  className={css["info-icon"]}
                  icon={faCircleInfo}
                  size={"1x"}
                />
              </DivWithToolTip>
            </div>
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
            <span>Computer Science - Bachelor</span>
          </ul>
        </div>

        <div className={css["footer-item"]}>
          <div className={css["secondary-title"]}>Work Experience</div>
          <ul>
            <span>Foton</span>
          </ul>
        </div>
        <div className={css["footer-item"]}>
          <div className={css["secondary-title"]}>Skills</div>
          <ul>
            <span>Java</span>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
