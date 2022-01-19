import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import videoAreYouReady from "../build/videos/1349x410video.mp4";

import "../styles/Home.css";

export default function Home() {
  return (
    <Container className="containerHome">
      <div className="video">
        <video loop={true} autoPlay={true} muted={true}>
          <source src={videoAreYouReady} type="video/mp4" />
        </video>
      </div>
      <Row>
        <Col xs={3}>1 of 3</Col>
        <Col xs={6}>2 of 3</Col>
        <Col xs={3}>3 of 3</Col>
      </Row>
    </Container>
  );
}
