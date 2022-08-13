import { useInView } from "framer-motion";
import React, { ReactElement, useRef } from "react";
import css from "./HomeSection.module.scss";

interface HomeSectionProps {
  animation?: "fromRight" | "fromLeft" | "popup";
  full?: boolean;
  children: ReactElement | ReactElement[];
}

const HomeSection = ({
  children,
  full = true,
  animation = "fromLeft",
}: HomeSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, {
    once: true,
  });

  return (
    <div
      ref={ref}
      className={`${css["section"]} ${full ? css["full"] : ""} ${
        isVisible ? css[animation] : ""
      }`}
    >
      {isVisible ? children : <></>}
    </div>
  );
};

export default HomeSection;
