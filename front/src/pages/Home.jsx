import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import videoAreYouReady from "../build/videos/1349x410video.mp4";
import bombVidWhite from "../build/videos/bombVidWhite.mp4";
import snakeVidWhite from "../build/videos/snakeVidWhite.mp4";

import circleShahar from "../build/images/animateShaharCircle.png";
import circleAmir from "../build/images/animateAmirCircle.png";

import "../styles/Home.css";

export default function Home() {
  return (
    <Container className="containerHome">
      <div className="videoDiv">
        <video className="video" loop={true} autoPlay={true} muted={true}>
          <source src={videoAreYouReady} type="video/mp4" />
        </video>
      </div>
      <br />
      <Row>
        <Col className="d-flex flex-row flex-wrap mx-5 mb-2 px-5">
          <div className="d-flex flex-column">
            <Card.Header className="leftCard">
              <h1
                style={{
                  fontSize: "40px",
                }}
              >
                Minesweeper
              </h1>
            </Card.Header>

            <Card className="leftCard ">
              <Card.Body>
                <Link to="/Minesweeper">
                  <video className="video" loop={true} autoPlay={true} muted={true}>
                    <source src={bombVidWhite} type="video/mp4" />
                  </video>
                </Link>
              </Card.Body>
            </Card>
          </div>
          <div className="d-flex flex-column ">
            <Card.Header className="rightCard">
              <h1
                style={{
                  fontSize: "40px",
                }}
              >
                Snake
              </h1>
            </Card.Header>
            <Card className="rightCard">
              <Card.Body>
                <Link to="/Snake">
                  <video className="video" loop={true} autoPlay={true} muted={true}>
                    <source src={snakeVidWhite} type="video/mp4" />
                  </video>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
      <br />
      <h1
        style={{
          fontSize: "50px",
        }}
      >
        Power Couple
      </h1>
      <hr
        style={{
          color: "black",
          height: "3px",
          width: "20%",
          margin: "0 0 0 40%",
        }}
      />

      <Row>
        <Col className="colBorderLeft">
          <div className="testDiv">
            <img style={{ float: "left" }} src={circleShahar} alt="Shahar Picture" />
            <p style={{ fontSize: "30px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo dolor, eleifend non posuere ac, pellentesque ut massa. Duis id
              ullamcorper nibh, in porttitor massa. Morbi faucibus nunc iaculis velit ultrices, non semper eros semper. Integer congue, ex nec placerat
              venenatis, mauris dui tristique tortor, sit amet faucibus nulla velit vel sapien. Aenean urna libero, vulputate quis vestibulum in, condimentum
              vitae est. Etiam vestibulum, erat sit amet feugiat dapibus, ex eros scelerisque mauris, at egestas velit neque id nisi. In in facilisis elit.
            </p>
          </div>
        </Col>
      </Row>
      <hr
        style={{
          color: "black",
          height: "3px",
          width: "80%",
          margin: "0 0 0 10%",
        }}
      />
      <Row>
        <Col className="colBorderRight">
          <div className="testDiv">
            <p style={{ fontSize: "30px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo dolor, eleifend non posuere ac, pellentesque ut massa. Duis id
              ullamcorper nibh, in porttitor massa. Morbi faucibus nunc iaculis velit ultrices, non semper eros semper. Integer congue, ex nec placerat
              venenatis, mauris dui tristique tortor, sit amet faucibus nulla velit vel sapien. Aenean urna libero, vulputate quis vestibulum in, condimentum
              vitae est. Etiam vestibulum, erat sit amet feugiat dapibus, ex eros scelerisque mauris, at egestas velit neque id nisi. In in facilisis elit.
            </p>
            <img style={{ float: "right" }} src={circleAmir} alt="Amir Picture" className="mx-3" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
