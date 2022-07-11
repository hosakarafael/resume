import React from "react";
import { GetServerSideProps } from "next";
import { User } from "@prisma/client";
import { UserPersonalDataService } from "../../../service/userService";
import css from "./detail.module.scss";
import { fullName, getUserImage } from "../../../models/UserEntity";
import Image from "next/image";
import { Textfit } from "react-textfit";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { isAuthenticatedRequest } from "../../../utils/securityUtils";
import { REDIRECT_REQUEST_LOGOUT } from "../../logout/index";

interface UserDetailProps {
  user: User | null;
  imageUrl: string;
}

const UserDetail = ({ user, imageUrl }: UserDetailProps) => {
  if (!user) return <div>No user!</div>;

  return (
    <div className={css["detail__container"]}>
      <div className={css["detail"]}>
        <div className={css["left-side"]}>
          <Image
            className={css["user-image"]}
            src={imageUrl}
            width={250}
            height={250}
            layout={"fixed"}
          />
          <div>
            <div className={css["info--white"]}>
              <div className={css["info-header"]}>
                <span>ABOUT ME</span>
              </div>
              <span className={css["info-item"]}>
                Date of birth: May 27 1992
              </span>
              <span className={css["info-item"]}>Age: 30</span>
              <span className={css["info-item"]}>Gender: Male</span>
              <span className={css["info-item"]}>
                Birth place: Brasilia, Brazil
              </span>
            </div>

            <div className={css["info--white"]}>
              <div className={css["info-header"]}>
                <span>CONTACT</span>
              </div>
              <div className={css["info-item"]}>
                <FontAwesomeIcon icon={faLocationDot} size={"lg"} />
                <span>
                  Rua Antonio de Camargo,39 Vila Sao Jorge - Guarulhos - Sao
                  Paulo - Brazil
                </span>
              </div>
              <span className={css["info-item"]}>
                <FontAwesomeIcon icon={faPhone} />
                +55 11 913992918
              </span>
              <span className={css["info-item"]}>
                <FontAwesomeIcon icon={faEnvelope} />
                rafaelhosaka@gmail.com
              </span>
            </div>

            <div className={css["info--white"]}>
              <div className={css["info-header"]}>
                <span>INTERESTS</span>
              </div>
              <div className={css["info-grid"]}>
                <span>Games</span>
                <span>Movie</span>
                <span>Programming</span>
                <span>Walking</span>
                <span>Science</span>
                <span>Animals</span>
              </div>
            </div>
          </div>
        </div>

        <div className={css["right-side"]}>
          <div className={css["user-header"]}>
            <Textfit mode="single" className={css["user-name"]}>
              {_.upperCase(fullName(user))}
            </Textfit>
            <div className={css["sub-title"]}>
              <span>{_.upperCase(user.title ? user.title : "")}</span>
            </div>
          </div>

          <div className={css["info"]}>
            <div className={css["info-header"]}>
              <span>CAREER OBJECTIVE</span>
            </div>
            <span className={css["info-item"]}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus, ex accusamus! Repudiandae, doloremque? Similique
              inventore assumenda aperiam nulla nisi aut, sapiente ratione
              labore accusantium. Maiores dolor mollitia tempora id, dolore
              tenetur deserunt sint iure nobis? Nostrum similique minima,
              assumenda impedit earum omnis autem aperiam, ad perferendis
              officia maiores mollitia ab.
            </span>
          </div>

          <div className={css["info"]}>
            <div className={css["info-header"]}>
              <span>EDUCATION</span>
            </div>
            <div className={css["info-title"]}>
              <span>Computer Science - Bachelor Degree</span>
              <span>Universidade Catolica de Brasilia</span>
              <span>2011 to 2014 at, Brasilia, Brazil</span>
            </div>
          </div>

          <div className={css["info"]}>
            <div className={css["info-header"]}>
              <span>SKILL</span>
            </div>
            <div className={css["info-grid"]}>
              <span>HTML/CSS/Javascript/React JS/Next JS</span>
              <span>JAVA/Spring Boot</span>
              <span>SQL - Postgresql/MySQL</span>
              <span>NOSQL - MongoDB</span>
              <span>Typescript/Sass/AWS S3</span>
              <span>2011 to 2014 at, Brasilia, Brazil</span>
            </div>
          </div>

          <div className={css["info"]}>
            <div className={css["info-header"]}>
              <span>EXPERIENCE</span>
            </div>
            <div className={css["info-title"]}>
              <span>Machine Operator and Quality inspection</span>
              <span>Murata manufacturing</span>
              <span>2018 to 2022 at Shimane, Japan</span>
            </div>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quia
              sunt veniam eligendi laboriosam exercitationem quas aliquam
              corrupti debitis veritatis quisquam commodi fuga consequuntur
              minima error quasi, eum iste cumque tenetur culpa illum, facilis
              velit? Quae aliquam animi nulla voluptatem placeat rem eveniet
              ipsam, distinctio accusamus nesciunt deleniti. Aperiam, quae.
            </p>

            <div className={css["info-title"]}>
              <span>Web Developer</span>
              <span>Foton</span>
              <span>2015 to 2016 at Brasilia, Brazil</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quia
              sunt veniam eligendi laboriosam exercitationem quas aliquam
              corrupti debitis veritatis quisquam commodi fuga consequuntur
              minima error quasi, eum iste cumque tenetur culpa illum, facilis
              velit? Quae aliquam animi nulla voluptatem placeat rem eveniet
              ipsam, distinctio accusamus nesciunt deleniti. Aperiam, quae.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<UserDetailProps> = async (
  context
) => {
  if (!isAuthenticatedRequest(context.req)) {
    return REDIRECT_REQUEST_LOGOUT;
  }

  const id = context.query.id as string;
  const user = await UserPersonalDataService.findById(id);
  const imageUrl = await getUserImage(user);
  return { props: { user, imageUrl } };
};

export default UserDetail;
