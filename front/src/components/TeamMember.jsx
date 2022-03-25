import React from "react";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";

export default function TeamMember(props) {
  const { name, title, git, linkedin, pic } = props.user;

  return (
    <div className="d-flex my-3 ">
      <div>
        <img src={pic} alt={name} className="mx-5 my-1" />
      </div>
      <div className="d-flex flex-column align-items-center grow m-5 bio">
        <div>
          <b>{name}</b> - {title}
        </div>
        <div className="d-flex flex-row">
          <a href={git} target="_blank">
            <AiOutlineGithub />
          </a>
          <a href={linkedin} target="_blank">
            <AiOutlineLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
}
