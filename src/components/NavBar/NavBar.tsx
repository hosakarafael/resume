import React from "react";
import Link from "next/link";
import Image from "next/image";
import css from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => (
  <nav className={css["navbar"]}>
    <Link href={"/"}>
      <a>
        <Image
          className={css["nav-item"]}
          src={"/images/resume.png"}
          width={60}
          height={60}
        />
      </a>
    </Link>
    <Link href={"/register"}>
      <a className={css["nav-item"]}>
        <FontAwesomeIcon
          icon={faUserPlus}
          size={"2x"}
          className={css["nav-icon"]}
        />
      </a>
    </Link>
  </nav>
);

export default NavBar;
