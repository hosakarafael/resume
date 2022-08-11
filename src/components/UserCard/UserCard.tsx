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
import React, { useEffect, useState } from "react";
import { fullName } from "../../models/UserEntity";
import getAxios from "../../utils/getAxios";

import css from "./UserCard.module.scss";
import Image from "next/image";
import DivWithToolTip from "../ToolTip/DivWithToolTip";
import Link from "next/link";
import Spinner from "../Spinner/Spinner";

interface UserCardProps {
  user: User;
  imageUrl: string | null;
  editable?: boolean;
}

const UserCard = ({ user, imageUrl, editable = false }: UserCardProps) => {
  const [image, setImage] = useState<string | null>(null);

  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl]);

  const handleUpload = async (e: React.FormEvent) => {
    const element = e.target;

    if (element instanceof HTMLInputElement) {
      const files = element.files;

      if (files) {
        setImage(null);
        const { data } = await getAxios().post(`/users/${user.id}/upload`, {
          name: files[0].name,
          type: files[0].type,
        });

        //create image on aws
        await axios.put(data, files[0]);
        //refresh page
        Router.push(`/profile/${user.id}`);
      }
    }
  };

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  const getImage = () => {
    return (
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
        <Spinner show={image === null} sizeClass="size--300">
          <Image
            className={css["card-image"]}
            src={image as string}
            width={300}
            height={300}
            layout={"fixed"}
          />
        </Spinner>
      </div>
    );
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
            {getImage()}
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
                <div className={css["card-user-title"]}>{user.title}</div>
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
            <h1 className={css["section"]}>Career Objective</h1>
            <span className={css["text-area"]}>{user.careerObjective}</span>
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
            {getImage()}

            <div>
              <h1 className={css["section"]}>Education</h1>
              <p className={css["section-title"]}>
                {user.educations[0]?.title}
              </p>
              <span className={css["text-area"]}>
                {user.educations[0]?.description}
              </span>
            </div>
          </div>
          <div className={css["back-footer"]}>
            <h1 className={css["section"]}>Work Experience</h1>
            <p className={css["section-title"]}>{user.works[0]?.title}</p>
            <span className={css["text-area"]}>
              {user.works[0]?.description}
            </span>
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
