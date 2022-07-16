import React, { useState } from "react";
import css from "./UserResume.module.scss";
import Image from "next/image";
import { Gender, User } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DivWithToolTip from "../ToolTip/DivWithToolTip";
import {
  faCheck,
  faEnvelope,
  faLocationDot,
  faPen,
  faPhone,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import InfoTable from "../InfoTable/InfoTable";
import InfoItem from "../InfoTable/InfoItem";
import { Textfit } from "react-textfit";
import { fullName } from "../../models/UserEntity";
import _ from "lodash";
import { useAlert } from "../Alert/Alert";
import { useEditableText } from "../../hook/useEditableText";
import getAxios from "../../utils/getAxios";
import { useEditableSelect } from "../../hook/useEditableSelect";
import { useEditableTextArea } from "../../hook/useEditableTextArea";
import { useEditableCollection } from "../../hook/useEditableCollection";

interface UserResumeProps {
  user: User;
  imageUrl: string;
  editable?: boolean;
}
const UserResume = ({ user, imageUrl, editable = false }: UserResumeProps) => {
  const [editting, setEditting] = useState(false);
  const [alert, dispatchAlert] = useAlert();

  const [editableName, name, resetName] = useEditableText(fullName(user));
  const [editablePhone, phone, resetPhone] = useEditableText(user.phone);
  const [editableGender, gender, resetGender] = useEditableSelect(
    user.gender,
    Object.values(Gender)
  );
  const [editableAddress, address, resetAddress] = useEditableText(
    user.address
  );
  const [editableTitle, title, resetTitle] = useEditableText(user.title);
  const [editableCareerObjective, careerObjective, resetCareerObjective] =
    useEditableTextArea(user.careerObjective);

  const [editableInterests, interests, resetInterests] = useEditableCollection(
    user.interests
  );
  const [editableSkills, skills, resetSkills] = useEditableCollection(
    user.skills
  );

  const handleEdit = () => {
    setEditting(true);
    dispatchAlert(
      "You can now edit your resume. Click on Save changes when you finished editting.",
      "info"
    );
  };

  const handleCancel = () => {
    setEditting(false);
    reset();
    dispatchAlert("Changes reverted", "info");
  };

  const reset = () => {
    resetName();
    resetPhone();
    resetTitle();
    resetGender();
    resetAddress();
    resetCareerObjective();
    resetSkills();
    resetInterests();
  };

  const handleSave = async () => {
    console.log(interests);

    const [firstName, lastName] = name.split(" ");
    await getAxios().put(`/users/${user.id}`, {
      firstName,
      lastName,
      phone,
      gender,
      address,
      title,
      careerObjective,
      interests,
      skills,
    });
    dispatchAlert("Changes saved successfully", "success");
    setEditting(false);
  };

  return (
    <div className={css["resume"]}>
      {alert}
      <div className={css["left-side"]}>
        <div className={css["left-header"]}>
          <Image
            className={css["user-image"]}
            src={imageUrl}
            width={250}
            height={250}
            layout={"fixed"}
          />
          {editable && (
            <div className={css["btn-area"]}>
              {editting ? (
                <>
                  <DivWithToolTip
                    onClick={handleSave}
                    tooltipLabel="Save changes"
                  >
                    <FontAwesomeIcon
                      className={css["edit-btn"]}
                      icon={faCheck}
                      size={"2x"}
                    />
                  </DivWithToolTip>
                  <DivWithToolTip
                    onClick={handleCancel}
                    tooltipLabel="Cancel editting"
                  >
                    <FontAwesomeIcon
                      className={css["edit-btn"]}
                      icon={faXmark}
                      size={"2x"}
                    />
                  </DivWithToolTip>
                </>
              ) : (
                <DivWithToolTip onClick={handleEdit} tooltipLabel="Edit resume">
                  <FontAwesomeIcon
                    className={css["edit-btn"]}
                    icon={faPen}
                    size={"2x"}
                  />
                </DivWithToolTip>
              )}
            </div>
          )}
        </div>
        <div>
          <InfoTable white title="ABOUT ME">
            <InfoItem>Date of birth: May 27 1992 </InfoItem>
            <InfoItem>Age: 30 </InfoItem>
            <InfoItem>Gender: {editableGender(editting)}</InfoItem>
            <InfoItem>Birth place: Brasilia, Brazil </InfoItem>
          </InfoTable>

          <InfoTable white title="CONTACT">
            <InfoItem>
              <FontAwesomeIcon icon={faLocationDot} size={"lg"} />
              {editableAddress(editting)}
            </InfoItem>
            <InfoItem>
              <FontAwesomeIcon icon={faPhone} />
              {editablePhone(editting)}
            </InfoItem>
            <InfoItem>
              <FontAwesomeIcon icon={faEnvelope} />
              {user.email}
            </InfoItem>
          </InfoTable>

          <InfoTable white grid title="INTERESTS">
            {editableInterests.map((editableInterest, index) => (
              <InfoItem key={index}>
                {editableInterest(index, editting)}
              </InfoItem>
            ))}
          </InfoTable>
        </div>
      </div>

      <div className={css["right-side"]}>
        <div className={css["right-header"]}>
          <Textfit mode="single" className={`${css["user-name"]}`}>
            {editableName(editting)}
          </Textfit>
          <div className={css["title"]}>
            {editableTitle(editting)}
            <span className={css["title-line"]} />
          </div>
        </div>

        <InfoTable title="CAREER OBJECTIVE">
          <InfoItem>{editableCareerObjective(editting)}</InfoItem>
        </InfoTable>

        <InfoTable title="EDUCATION">
          <InfoItem>Computer Science - Bachelor Degree</InfoItem>
          <InfoItem>Universidade Catolica de Brasilia</InfoItem>
          <InfoItem>2011 to 2014 at, Brasilia, Brazil</InfoItem>
        </InfoTable>

        <InfoTable grid title="SKILL">
          {editableSkills.map((editableSkill, index) => (
            <InfoItem key={index}>{editableSkill(index, editting)}</InfoItem>
          ))}
        </InfoTable>

        <InfoTable title="EXPERIENCE">
          <div className={css["info-subtitle"]}>
            <InfoItem>Machine Operator and Quality inspection</InfoItem>
            <InfoItem>Murata manufacturing</InfoItem>
            <InfoItem>2018 to 2022 at Shimane, Japan</InfoItem>
          </div>
          <InfoItem>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quia
            sunt veniam eligendi laboriosam exercitationem quas aliquam corrupti
            debitis veritatis quisquam commodi fuga consequuntur minima error
            quasi, eum iste cumque tenetur culpa illum, facilis velit? Quae
            aliquam animi nulla voluptatem placeat rem eveniet ipsam, distinctio
            accusamus nesciunt deleniti. Aperiam, quae.
          </InfoItem>
          <div className={css["info-subtitle"]}>
            <InfoItem>Web Developer</InfoItem>
            <InfoItem>Foton</InfoItem>
            <InfoItem>2015 to 2016 at Brasilia, Brazil</InfoItem>
          </div>
          <InfoItem>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quia
            sunt veniam eligendi laboriosam exercitationem quas aliquam corrupti
            debitis veritatis quisquam commodi fuga consequuntur minima error
            quasi, eum iste cumque tenetur culpa illum, facilis velit? Quae
            aliquam animi nulla voluptatem placeat rem eveniet ipsam, distinctio
            accusamus nesciunt deleniti. Aperiam, quae.
          </InfoItem>
        </InfoTable>
      </div>
    </div>
  );
};

export default UserResume;
