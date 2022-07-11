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
import InfoTable from "../../../components/InfoTable/InfoTable";
import InfoItem from "../../../components/InfoTable/InfoItem";

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
            <InfoTable white title="ABOUT ME">
              <InfoItem>Date of birth: May 27 1992 </InfoItem>
              <InfoItem>Age: 30 </InfoItem>
              <InfoItem>Gender: Male </InfoItem>
              <InfoItem>Birth place: Brasilia, Brazil </InfoItem>
            </InfoTable>

            <InfoTable white title="CONTACT">
              <InfoItem>
                <FontAwesomeIcon icon={faLocationDot} size={"lg"} />
                Rua Antonio de Camargo,39 Vila Sao Jorge - Guarulhos - Sao Paulo
                - Brazil
              </InfoItem>
              <InfoItem>
                <FontAwesomeIcon icon={faPhone} />
                +55 11 913992918
              </InfoItem>
              <InfoItem>
                <FontAwesomeIcon icon={faEnvelope} />
                rafaelhosaka@gmail.com
              </InfoItem>
            </InfoTable>

            <InfoTable white grid title="INTERESTS">
              <InfoItem>Games</InfoItem>
              <InfoItem>Movie</InfoItem>
              <InfoItem>Programming</InfoItem>
              <InfoItem>Walking</InfoItem>
              <InfoItem>Animals</InfoItem>
              <InfoItem>Science</InfoItem>
            </InfoTable>
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

          <InfoTable title="CAREER OBJECTIVE">
            <InfoItem>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus, ex accusamus! Repudiandae, doloremque? Similique
              inventore assumenda aperiam nulla nisi aut, sapiente ratione
              labore accusantium. Maiores dolor mollitia tempora id, dolore
              tenetur deserunt sint iure nobis? Nostrum similique minima,
              assumenda impedit earum omnis autem aperiam, ad perferendis
              officia maiores mollitia ab.
            </InfoItem>
          </InfoTable>

          <InfoTable title="EDUCATION">
            <InfoItem>Computer Science - Bachelor Degree</InfoItem>
            <InfoItem>Universidade Catolica de Brasilia</InfoItem>
            <InfoItem>2011 to 2014 at, Brasilia, Brazil</InfoItem>
          </InfoTable>

          <InfoTable grid title="SKILL">
            <InfoItem>HTML/CSS/Javascript/React JS/Next JS</InfoItem>
            <InfoItem>JAVA/Spring Boot</InfoItem>
            <InfoItem>SQL - Postgresql/MySQL</InfoItem>
            <InfoItem>NOSQL - MongoDB</InfoItem>
            <InfoItem>Typescript/Sass/AWS S3</InfoItem>
            <InfoItem>2011 to 2014 at, Brasilia, Brazil</InfoItem>
          </InfoTable>

          <InfoTable title="EXPERIENCE">
            <div className={css["info-subtitle"]}>
              <InfoItem>Machine Operator and Quality inspection</InfoItem>
              <InfoItem>Murata manufacturing</InfoItem>
              <InfoItem>2018 to 2022 at Shimane, Japan</InfoItem>
            </div>
            <InfoItem>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quia
              sunt veniam eligendi laboriosam exercitationem quas aliquam
              corrupti debitis veritatis quisquam commodi fuga consequuntur
              minima error quasi, eum iste cumque tenetur culpa illum, facilis
              velit? Quae aliquam animi nulla voluptatem placeat rem eveniet
              ipsam, distinctio accusamus nesciunt deleniti. Aperiam, quae.
            </InfoItem>
            <div className={css["info-subtitle"]}>
              <InfoItem>Web Developer</InfoItem>
              <InfoItem>Foton</InfoItem>
              <InfoItem>2015 to 2016 at Brasilia, Brazil</InfoItem>
            </div>
            <InfoItem>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quia
              sunt veniam eligendi laboriosam exercitationem quas aliquam
              corrupti debitis veritatis quisquam commodi fuga consequuntur
              minima error quasi, eum iste cumque tenetur culpa illum, facilis
              velit? Quae aliquam animi nulla voluptatem placeat rem eveniet
              ipsam, distinctio accusamus nesciunt deleniti. Aperiam, quae.
            </InfoItem>
          </InfoTable>
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
