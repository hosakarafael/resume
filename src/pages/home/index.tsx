import Image from "next/image";
import css from "./home.module.scss";
import HomeSection from "../../components/HomeSection/HomeSection";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface HomeSectionItem {
  id: string;
  title: string;
  functionalities: string[];
  imageURL?: string;
  description: string;
  technologies: string;
}

const Home = () => {
  const items: HomeSectionItem[] = [
    {
      id: "1",
      title: "ResuMe",
      imageURL: "/images/resume_full.png",
      description: "ResuMe is a project that generate digital C.V",
      functionalities: [
        "Register user",
        "Login/Logout",
        "Show user card or resume",
        "Edit user information",
        "Upload user image",
        "Generate PDF",
        "Search users",
      ],
      technologies:
        "Front-end: Next.js, Typescript, Sass\nBack-end: Next.js, Typecript, JWT, AWS S3, MongoDB",
    },
    {
      id: "2",
      title: "ShareMe",
      imageURL: "/images/shareme_full.png",
      description:
        "ShareMe is a social media which has Facebook as inspiration.",
      functionalities: [
        "Register User and send verification email",
        "Re-send verification email",
        "Create or Delete Post with or without image",
        "Comment or like Post/Comment",
        "Request or accept user as friend",
        "Search users",
        "Upload profile image or cover image",
        "and more...",
      ],
      technologies:
        "Front-end: React, Typescript, Sass\nBack-end: JAVA, JWT, AWS S3,Spring Framework, MongoDB",
    },
    {
      id: "3",
      title: "Ecomm",
      description: "Ecomm is a digital market which has AMAZON as inspiration.",
      functionalities: [
        "Register a account",
        "Login and Logout",
        "Open Shop",
        "Register, Update, Delete own products",
        "Search products and Add to Cart",
        "Remove product from cart",
        "Check cart and proceed to CheckOut",
        "Check buy history",
      ],
      technologies:
        "Front-end: Thymeleaf, HTML, CSS\nBack-end: JAVA, Spring Framework, PostgreSQL",
    },
    {
      id: "4",
      title: "Siorg",
      functionalities: [
        "Register, Search, Update, Delete employee",
        "Generate graphical hierarchy",
        "Web Service API that provide datas for other government systems as XML",
      ],
      description:
        "Siorg is a project developed during the last semester of my university. (Final Paper)\n" +
        "It has objective to track all government employees.\n" +
        "It works like a Git. All modification is indexed.\n" +
        "This way we know where the employee was working or what role did he had at specific time in the past",
      technologies:
        "Front-end: HTML, CSS, Javascript, Primefaces\nBack-end: JAVA,JAVA EE, JPA, PostgreSQL, Glassfish Server, Tortoise SVN",
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
          <img src={"/images/me.jpeg"} width={300} height={300} />
        </div>
        <span>Hello! My name is</span>
        <h1 className={css["name"]}>Rafael Hideki Hosaka</h1>
        <p>I&apos;m Web Developer</p>
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
              className={css[`projects__${item.id}`]}
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
                <div className={css[`project__header-${item.id}`]}>
                  {item.imageURL ? (
                    <Image
                      src={item.imageURL}
                      width={300}
                      height={120}
                      layout={"fixed"}
                    />
                  ) : (
                    <motion.h1 className={css["title"]}>{item.title}</motion.h1>
                  )}
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
                    <p>{item.description}</p>
                    <ul>
                      {item.functionalities?.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={css["tech__container"]}>
                    <div>
                      <h1>TECHNOLOGIES</h1>
                      {item.technologies}
                    </div>
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
