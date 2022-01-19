import React from "react";
import areYouReadyVideo from "../build/videos/welcome.mp4";

export default function Home() {
  return (
    <div className="video">
      <video loop={true} autoPlay={true} muted={true}>
        <source src={areYouReadyVideo} type="video/mp4" />
      </video>
    </div>
  );
}
