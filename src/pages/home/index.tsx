import Image from "next/image";
import css from "./home.module.scss";
import HomeSection from "../../components/HomeSection/HomeSection";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComputer,
  faFileLines,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface HomeSectionItem {
  id: string;
  title: string;
  description: string;
  technologies: string;
}

const Home = () => {
  const items: HomeSectionItem[] = [
    {
      id: "1",
      title: "ResuMe",
      description:
        "ResuMe is a project that create C.V, we can edit the information and download as PDF. We can also search user",
      technologies:
        "FrontEnd : Next.js, Typescript, Sass\nBackEnd : Next.js, Typecript, MongoDB",
    },
    {
      id: "2",
      title: "ShareMe",
      description: "description",
      technologies: "technologies",
    },
    {
      id: "3",
      title: "Ecomm",
      description: "description",
      technologies: "technologies",
    },
    {
      id: "4",
      title: "Siorg",
      description: "description",
      technologies: "technologies",
    },
  ];
  const [item, setItem] = useState<HomeSectionItem | null>(null);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const i = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className={css["home__container"]}>
      <div className={`${css["introduction"]} ${css["section"]}`}>
        <div className={css["image__container"]}>
          <Image
            src={"/images/me.jpeg"}
            width={300}
            height={300}
            layout={"fixed"}
          />
        </div>
        <span>Hello! My name is</span>
        <h1 className={css["name"]}>Rafael Hideki Hosaka</h1>
        <p>I'm Web Developer</p>
      </div>
      <HomeSection full={false}>
        <motion.div
          animate={{ scale: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className={css["image__container"]}
        >
          <Image
            src={"/images/ucb.webp"}
            width={300}
            height={300}
            layout={"fixed"}
          />
        </motion.div>
        <span>Bachelor of Computer Science - 4 years</span>
        <span>at Universidade Catolica de Brasilia (2011 to 2014)</span>
      </HomeSection>
      <HomeSection animation="fromRight">
        <motion.div
          animate={{ scale: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a href="https://badges.wes.org/Evidence?i=726c7d3d-9bb5-4fb5-bf4d-ff40c2c70616&type=ca">
            <Image src={"/images/wes.png"} width={300} height={300} />
          </a>
        </motion.div>
        <h1>Verified International Academic Qualification</h1>
        <h5>(click on image to see)</h5>
      </HomeSection>
      <HomeSection animation="fromRight">
        <h1>My Projects</h1>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className={css["projects__container"]}
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={i}
              className={css["projects"]}
              layoutId={item.id}
              onClick={() => setItem(item)}
            >
              <motion.h5>{item.title}</motion.h5>
            </motion.div>
          ))}
        </motion.div>
        <h5>(click for project details)</h5>
        <div className={css["project__container"]}>
          <AnimatePresence>
            {item && (
              <motion.div className={css["project"]} layoutId={item.id}>
                <div className={css["project__header"]}>
                  <motion.h1 className={css["title"]}>{item.title}</motion.h1>
                  <div>
                    <motion.div
                      className={css["close-btn"]}
                      onClick={() => setItem(null)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </motion.div>
                  </div>
                </div>

                <div className={css["project__body"]}>
                  <div className={css["desc__container"]}>
                    {item.description}
                  </div>
                  <div className={css["icon"]}>
                    <FontAwesomeIcon icon={faFileLines} size="5x" />
                  </div>
                  <div className={css["icon"]}>
                    <FontAwesomeIcon icon={faComputer} size="5x" />
                  </div>
                  <div className={css["tech__container"]}>
                    <h1>TECHNOLOGIES</h1>
                    {item.technologies}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </HomeSection>
    </div>
  );
};

export default Home;
