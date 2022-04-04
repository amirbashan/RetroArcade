import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import OurTeam from "../components/OurTeam";
import videoAreYouReady from "../build/videos/1349x410video.mp4";
import Mine from "../build/videos/mine.mp4";
import Snake from "../build/videos/snake.mp4";

export default function Home() {
  return (
    <Container className="">
      <div className="videoDiv mb-4">
        <video className="video" loop={true} autoPlay={true} muted={true}>
          <source src={videoAreYouReady} type="video/mp4" />
        </video>
      </div>
      <Heading className="mb-3">Most Played</Heading>
      <Row>
        <Col className="d-flex flex-row flex-wrap mx-5 mb-2 px-2">
          <div className="d-flex flex-column mx-3">
            <Link to="/Minesweeper">
              <video className="video" loop={true} autoPlay={true} muted={true}>
                <source src={Mine} type="video/mp4" />
              </video>
            </Link>
          </div>
          <div className="d-flex flex-column mx-3">
            <Link to="/Snake">
              <video loop={true} autoPlay={true} muted={true}>
                <source src={Snake} type="video/mp4" />
              </video>
            </Link>
          </div>
        </Col>
      </Row>
      <OurTeam />
    </Container>
  );
}
