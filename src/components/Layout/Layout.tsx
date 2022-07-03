import Head from "next/head";
import NavBar from "../NavBar/NavBar";
import React, { ReactElement } from "react";
import css from "./Layout.module.scss";

interface LayoutProps {
  children: ReactElement | ReactElement[];
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <div className={css["layout"]}>
      <div className={css["bg-image"]}>
        <div className={css["bg-overlay"]}>
          <Head>
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />

            <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
          </Head>
          <NavBar />
          {children}
        </div>
      </div>
      <div className={css["footer"]}> Rafael Hideki Hosaka © 2022</div>
    </div>
  </>
);

export default Layout;
