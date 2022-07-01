import Head from "next/head";
import NavBar from "../NavBar/NavBar";
import React, { ReactElement } from "react";

interface LayoutProps {
  children: ReactElement | ReactElement[];
}

const Layout = ({ children }: LayoutProps) => (
  <>
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
  </>
);

export default Layout;
