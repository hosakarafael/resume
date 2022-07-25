import React from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Router, useRouter } from "next/router";

interface TransitionProps {
  children: JSX.Element;
}

const Transition = ({ children }: TransitionProps) => {
  const { pathname } = useRouter();

  const routeChange = () => {
    const tempFix = () => {
      const allStyleElems = document.querySelectorAll('style[media="x"]');
      allStyleElems.forEach((elem) => {
        elem.removeAttribute("media");
      });
    };
    tempFix();
  };

  Router.events.on("routeChangeComplete", routeChange);
  Router.events.on("routeChangeStart", routeChange);

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      <motion.div
        key={pathname}
        initial={{ x: -1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 1000, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Transition;
