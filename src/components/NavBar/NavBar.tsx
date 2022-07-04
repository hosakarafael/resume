import React from "react";
import Image from "next/image";
import css from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import NavLinkWithToolTip from "../ToolTip/NavLinkWithToolTip";

const NavBar = () => (
  <nav className={css["navbar"]}>
    <Link className={css["nav-item"]} href={"/"}>
      <a>
        <Image src={"/images/resume.png"} width={60} height={60} />
      </a>
    </Link>
    <div className={css["nav-right"]}>
      <NavLinkWithToolTip
        tooltipLabel="Show card"
        activeClass={css["active"]}
        className={css["nav-item"]}
        to={`/profile/62c046edf44eb5d2c122785d`}
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
    </div>
  </nav>
);

export default NavBar;
