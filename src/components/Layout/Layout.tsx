import Head from "next/head";
import NavBar from "../NavBar/NavBar";
import React from "react";
import css from "./Layout.module.scss";
import Transition from "../Transtition/Transition";

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className={css["layout"]}>
        <div className={css["bg-image"]}>
          <div className={css["bg-overlay"]}>
            <Head>
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon/favicon-32x32.png"
              />
              <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
            </Head>
            <NavBar />
            <Transition>{children}</Transition>
          </div>
        </div>

        <div className={css["footer"]}>
          Rafael Hideki Hosaka © 2022 ResuMe
          {process.env.NEXT_PUBLIC_APP_VERSION}
        </div>
      </div>
    </>
  );
};

export default Layout;
