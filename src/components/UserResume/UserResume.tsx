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
import _ from "lodash";
import { useAlert } from "../Alert/Alert";
import { useEditableText } from "../../hook/useEditableText";
import { useEditableSelect } from "../../hook/useEditableSelect";
import { useEditableTextArea } from "../../hook/useEditableTextArea";
import { useEditableCollection } from "../../hook/useEditableCollection";
import { useEditableSections } from "../../hook/useEditableSections";
import {
  calculateAge,
  DAYS,
  formatDate,
  MONTHS,
  splitDate,
  YEARS,
} from "../../utils/dateUtils";

interface UserResumeProps {
  user: User;
  imageUrl: string;
  editable?: boolean;
  onSave?: (user: any) => void;
}
const UserResume = ({
  user,
  imageUrl,
  editable = false,
  onSave,
}: UserResumeProps) => {
  const [editting, setEditting] = useState(false);
  const [alert, dispatchAlert] = useAlert();

  const [editableFirstName, firstName, resetFirstName] = useEditableText(
    user.firstName
  );
  const [editableLastName, lastName, resetLastName] = useEditableText(
    user.lastName
  );
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
    user.interests.length ? user.interests : Array(6).fill("")
  );
  const [editableSkills, skills, resetSkills] = useEditableCollection(
    user.skills.length ? user.skills : Array(6).fill("")
  );
  const [
    editableEducations,
    educations,
    resetEducations,
    addEducation,
    deleteEducation,
  ] = useEditableSections(user.educations);

  const date = splitDate(user.birthDate);
  const [editableYear, year, resetYear] = useEditableSelect(
    date[0].toString(),
    YEARS
  );
  const [editableMonth, month, resetMonth] = useEditableSelect(
    date[1].toString(),
    Object.keys(MONTHS),
    Object.values(MONTHS)
  );
  const [editableDay, day, resetDay] = useEditableSelect(
    date[2].toString(),
    DAYS
  );

  const [editableWorks, works, resetWorks, addWork, deleteWork] =
    useEditableSections(user.works);

  const handleSave = () => {
    const birthDate = new Date(parseInt(year), parseInt(month), parseInt(day));
    console.log(birthDate);

    if (onSave) {
      onSave({
        firstName,
        lastName,
        address,
        title,
        phone,
        gender,
        careerObjective,
        interests,
        skills,
        educations,
        works,
        birthDate,
      });
      dispatchAlert("Changes saved successfully", "success");
      setEditting(false);
    }
  };

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
    resetFirstName();
    resetLastName();
    resetPhone();
    resetTitle();
    resetGender();
    resetAddress();
    resetCareerObjective();
    resetSkills();
    resetInterests();
    resetEducations();
    resetWorks();
    resetDay();
    resetMonth();
    resetYear();
  };

  const renderDeleteSection = (deleteFunction: (index: number) => void) => {
    return (
      <div className={css["delete-btn__container"]}>
        <DivWithToolTip
          onClick={deleteFunction}
          tooltipLabel="Delete this section"
        >
          <FontAwesomeIcon className={css["delete-btn"]} icon={faXmark} />
        </DivWithToolTip>
      </div>
    );
  };

  const renderAddButtonSection = (
    label: string,
    addFunction: (object: { title: string; description: string }) => void
  ) => {
    return (
      <button
        className="btn btn--primary my-1"
        onClick={() => addFunction({ title: "", description: "" })}
      >
        {label}
      </button>
    );
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
            <InfoItem>
              <span className={css["label-date"]}>Date of birth:</span>
              <div className={css["user-date"]}>
                {!editting ? (
                  <>{formatDate(user.birthDate)}</>
                ) : (
                  <>
                    {editableMonth(editting)}
                    {editableDay(editting)}
                    {editableYear(editting)}
                  </>
                )}
              </div>
            </InfoItem>
            <InfoItem>Age: {calculateAge(user.birthDate).toString()}</InfoItem>
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
          <div className={`${css["user-name"]}`}>
            {editableFirstName(editting)}
            {editableLastName(editting)}
          </div>

          <div className={css["title"]}>
            {editableTitle(editting)}
            <span className={css["title-line"]} />
          </div>
        </div>

        <InfoTable title="CAREER OBJECTIVE">
          <InfoItem>{editableCareerObjective(editting)}</InfoItem>
        </InfoTable>
        <InfoTable title="EDUCATION">
          <>
            {editableEducations.map((editableEducation, index) => {
              return (
                <div key={index} className={css["editable-text__container"]}>
                  {editting &&
                    renderDeleteSection(() => deleteEducation(index))}
                  {editableEducation(index, editting)}
                </div>
              );
            })}
            {editting &&
              renderAddButtonSection("Add new education", addEducation)}
          </>
        </InfoTable>

        <InfoTable grid title="SKILL">
          {editableSkills.map((editableSkill, index) => (
            <InfoItem key={index}>{editableSkill(index, editting)}</InfoItem>
          ))}
        </InfoTable>
        <InfoTable title="WORK EXPERIENCE">
          <>
            {editableWorks.map((editableWork, index) => {
              return (
                <div key={index} className={css["editable-text__container"]}>
                  {editting && renderDeleteSection(() => deleteWork(index))}
                  {editableWork(index, editting)}
                </div>
              );
            })}
            {editting &&
              renderAddButtonSection("Add new work experience", addWork)}
          </>
        </InfoTable>
      </div>
    </div>
  );
};

export default UserResume;
