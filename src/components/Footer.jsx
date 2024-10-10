import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { FaGithub, FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
// import SocialIcon from "./SocialIcon"; 

const Footer = () => {
  return (
    <footer className="footer text-center bg-dark text-light">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center mb-4">
            <ListGroup horizontal className="justify-content-center">
              {["Terms Of Use", "Privacy Policy", "About", "Blog", "FAQ"].map(
                (item, index) => (
                  <ListGroup.Item
                    key={index}
                    className="cursor-pointer text-xs md:text-base hover:text-pink duration-200 border-0"
                  >
                    {item}
                  </ListGroup.Item>
                )
              )}
            </ListGroup>
          </Col>

          <Col xs={12} className="text-center text-xs md:text-sm mb-4 opacity-75">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id
              veniam ipsa facere! Est consequatur, explicabo laboriosam suscipit
              eius rem non amet ratione fugiat provident reprehenderit error?
              Fuga iure quam sed atque, ipsum explicabo dignissimos! Voluptas
              vero facilis velit beatae totam. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Velit, pariatur.
            </p>
          </Col>

          <Col xs={12} className="text-center mb-4">
            <ul className="list-inline">
              {/* <SocialIcon Icon={FaGithub} url={""} />
              <SocialIcon Icon={FaFacebookF} url={""} />
              <SocialIcon Icon={FaInstagram} url={""} />
              <SocialIcon Icon={FaTwitter} url={""} />
              <SocialIcon Icon={FaLinkedin} url={""} /> */}
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
