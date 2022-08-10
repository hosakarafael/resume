import {
  faCamera,
  faCircleInfo,
  faEnvelope,
  faLocationDot,
  faPhone,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";
import axios from "axios";
import Router from "next/router";
import React, { useState } from "react";
import { fullName } from "../../models/UserEntity";
import getAxios from "../../utils/getAxios";

import css from "./UserCard.module.scss";
import Image from "next/image";
import DivWithToolTip from "../ToolTip/DivWithToolTip";
import Link from "next/link";

interface UserCardProps {
  user: User;
  imageUrl: string;
  editable?: boolean;
}

const UserCard = ({ user, imageUrl, editable = false }: UserCardProps) => {
  const [flipped, setFlipped] = useState(false);

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

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  const getFrontCard = () => {
    return (
      <>
        <div className={css["front-card__container"]}>
          <div className={css["front-card"]}>
            <DivWithToolTip
              className={css["flip__container"]}
              tooltipLabel="Flip card"
            >
              <FontAwesomeIcon
                className={css["flip-icon"]}
                onClick={handleFlip}
                icon={faShare}
                size={"2x"}
              />
            </DivWithToolTip>
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
                      accept=".png,.jpeg,.jpg"
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
                  <div className={css["user-name"]}>{fullName(user)}</div>

                  <Link href={`/profile/${user.id}/detail`}>
                    <a>
                      <DivWithToolTip tooltipLabel="Details">
                        <FontAwesomeIcon
                          className={css["info-icon"]}
                          icon={faCircleInfo}
                          size={"1x"}
                        />
                      </DivWithToolTip>
                    </a>
                  </Link>
                </div>
                <div className={css["card-sub-heading"]}>{user.title}</div>
              </div>
              <div className={css["card-body"]}>
                <div>
                  <span className={css["card-icon"]}>
                    <FontAwesomeIcon icon={faLocationDot} size={"lg"} />
                  </span>
                  <span className={css["card-data"]}>{user.address}</span>
                </div>
                <div>
                  <span className={css["card-icon"]}>
                    <FontAwesomeIcon icon={faPhone} size={"lg"} />
                  </span>
                  <span className={css["card-data"]}>{user.phone}</span>
                </div>
                <div>
                  <span className={css["card-icon"]}>
                    <FontAwesomeIcon icon={faEnvelope} size={"lg"} />
                  </span>
                  <span className={css["card-data"]}>{user.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={css["front-footer"]}>
            <div className={css["secondary-title"]}>Education</div>
            <ul>
              <span>{user.educations[0]?.title}</span>
            </ul>
          </div>
        </div>
      </>
    );
  };

  const getBackCard = () => {
    return (
      <>
        <div className={css["back-card__container"]}>
          <div className={css["back-card"]}>
            <DivWithToolTip
              className={css["flip__container"]}
              tooltipLabel="Flip card"
            >
              <FontAwesomeIcon
                className={css["flip-icon"]}
                onClick={handleFlip}
                icon={faShare}
                size={"2x"}
              />
            </DivWithToolTip>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={css["background"]}>
      <div className={`${css["card__container"]} ${flipped && css["flip"]}`}>
        {flipped ? getBackCard() : getFrontCard()}
      </div>
    </div>
  );
};

export default UserCard;
