import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../Routes";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import BasicExample from "../components/BasicExample/BasicExample";
import { dest_root } from "../../target_config";
import "./HomePage.css";

export const HomePage: FC = () => {
  return (
    <div className="home-page">
      <header>
        <BasicExample />
      </header>

      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="text-center">

            <h1 className="main-page-title">Прогноз роста объема данных</h1>
            <p>
              Перейдите на сайт, чтобы получить возможность рассчитать предполагаемый объем данных,
              на основе определённых факторов роста.
            </p>

            {/* <div className="carousel-dots">
              <Link to={ROUTES.HOME} className="dot" />
              <Link to={ROUTES.DATA_GROWTH_FACTORS} className="dot" />
            </div> */}

            <Link to={ROUTES.DATA_GROWTH_FACTORS}>
            <Carousel className="homepage-carousel mb-4">
              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-img"
                  src={`${dest_root}logo512.png`}
                  alt="Слайд 1"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-img"
                  src={`${dest_root}hp_img2.jpg`}
                  alt="Слайд 2"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-img"
                  src={`${dest_root}hp_img3.jpg`}
                  alt="Слайд 3"
                />
              </Carousel.Item>
            </Carousel>
            </Link>

          </Col>
        </Row>
      </Container>
    </div>
  );
};
