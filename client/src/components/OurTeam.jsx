import React from "react";
import { Heading } from "@chakra-ui/react";
import circleShahar from "../build/images/C-SHAHAR.png";
import circleAmir from "../build/images/C-AMIR.png";
import TeamMember from "./TeamMember";

export default function OurTeam() {
  const AMIR = {
    name: "Amir Bashan",
    title: "FullStack Developer",
    linkedin: "https://www.linkedin.com/in/amir-bashan-2a48a8124/",
    git: "https://github.com/amirbashan/",
    pic: circleAmir,
  };
  const SHAHAR = {
    name: "Shahar Knafo",
    title: "FullStack Developer",
    linkedin: "https://www.linkedin.com/in/shahar-knafo-1b8430146/",
    git: "https://github.com/shaharknafo",
    pic: circleShahar,
  };

  return (
    <>
      <hr
        style={{
          color: "black",
          height: "3px",
          width: "80%",
          margin: "0 0 0 10%",
        }}
        className="mt-5"
      />
      <Heading className="mt-5 mb-3">Our Team</Heading>

      <TeamMember user={AMIR} />
      <TeamMember user={SHAHAR} />
    </>
  );
}
