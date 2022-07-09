import React from "react";
import Image from "next/image";
import css from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faAddressCard,
  faArrowRightToBracket,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import NavLinkWithToolTip from "../ToolTip/NavLinkWithToolTip";
import { useUserContext } from "../../context/userContext";
import DivWithToolTip from "../ToolTip/DivWithToolTip";
import getAxios from "../../utils/getAxios";
import Router from "next/router";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
  const { user: currentUser, setUser: setCurrentUser } = useUserContext();

  const handleLogout = () => {
    getAxios().delete("/logout");
    setCurrentUser?.(null);
    Router.replace("/login");
  };

  const handleSubmit = (query: string) => {
    Router.push(`/search/${query}`);
  };

  return (
    <nav className={css["navbar"]}>
      <div className={css["nav-left"]}>
        <Link href={"/"}>
          <a className={css["brand"]}>
            <Image src={"/images/resume.png"} width={60} height={60} />
          </a>
        </Link>
        <SearchBar onSubmit={handleSubmit} expandable placeHolder="Search..." />
      </div>
      <div className={css["nav-right"]}>
        <NavLinkWithToolTip
          tooltipLabel={`Profile`}
          activeClass={css["active"]}
          className={css["nav-item"]}
          to={`/profile/${currentUser?.id}`}
        >
          <FontAwesomeIcon
            icon={faAddressCard}
            size={"2x"}
            className={css["nav-icon"]}
          />
        </NavLinkWithToolTip>
        <NavLinkWithToolTip
          tooltipLabel="Register"
          className={css["nav-item"]}
          activeClass={css["active"]}
          to={"/register"}
        >
          <FontAwesomeIcon
            icon={faUserPlus}
            size={"2x"}
            className={css["nav-icon"]}
          />
        </NavLinkWithToolTip>
        {currentUser ? (
          <DivWithToolTip
            tooltipLabel="Logout"
            className={css["nav-item"]}
            activeClass={css["active"]}
            onClick={handleLogout}
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              size={"2x"}
              className={css["nav-icon"]}
            />
          </DivWithToolTip>
        ) : (
          <NavLinkWithToolTip
            tooltipLabel="Login"
            className={css["nav-item"]}
            activeClass={css["active"]}
            to={"/login"}
          >
            <FontAwesomeIcon
              icon={faArrowRightToBracket}
              size={"2x"}
              className={css["nav-icon"]}
            />
          </NavLinkWithToolTip>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
