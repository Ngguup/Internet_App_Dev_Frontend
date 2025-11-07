import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../Routes";
import { Col, Container, Row } from "react-bootstrap";
import "./HomePage.css"

export const HomePage: FC = () => {
  return (
    <div className="home-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h1 className="main-page-title">Прогноз роста объема данных</h1>
            <p>
              Перейдите на сайт, чтобы получить возможность рассчитать предполагаемый объем данных,
              на основе определённых факторов роста.
            </p>
            <div className="carousel-dots">
              <Link to={ROUTES.HOME} className="dot" />
              <Link to={ROUTES.DATA_GROWTH_FACTORS} className="dot" />
            </div>

          </Col>
        </Row>
      </Container>
    </div>
  );
};