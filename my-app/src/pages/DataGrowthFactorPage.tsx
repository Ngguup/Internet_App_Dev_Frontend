import "./DataGrowthFactorPage.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { useParams } from "react-router-dom";
import { DataGrowthFactor, getDataGrowthFactorById } from "../modules/GrowthForecastApi";
import { Col, Row, Spinner, Container} from "react-bootstrap";
import { DATA_GROWTH_FACTORS_MOCK } from "../modules/mock";
import defaultImage from "/DefaultImage.jpg";
import BasicExample from "../components/BasicExample/BasicExample";

import { DsDataGrowthFactor } from '../api/Api';

export const DataGrowthFactorPage: FC = () => {
  const [pageData, setPageDdata] = useState<DsDataGrowthFactor>();

  const { id } = useParams(); 

  useEffect(() => {
    if (!id) return;
    getDataGrowthFactorById(id)
      .then((response) => setPageDdata(response))
      .catch(
        () =>
          setPageDdata(
            DATA_GROWTH_FACTORS_MOCK.find(
              (dgf) => String(dgf.id) == id
            )
          ) 
      );
  }, [id]);

  return (
    <div>
      <BasicExample/>
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.DATA_GROWTH_FACTORS, path: ROUTES.DATA_GROWTH_FACTORS },
          { label: pageData?.title || "Фактор" },
        ]}
      />
      {pageData ? ( 
        // <div className="container">
        //   <Row>
        //     <Col md={6}>
        //       <p>
        //         Альбом: <strong>{pageData.Title}</strong>
        //       </p>
        //       <p>
        //         Исполнитель: <strong>{pageData.Description}</strong>
        //       </p>
        //     </Col>
        //     <Col md={6}>
        //       <Image
        //         src={pageData.Image || defaultImage}
        //         alt="Картинка"
        //         width={100}
        //       />
        //     </Col>
        //   </Row>
        // </div>
        <div className="data-growth-page">
          <Container className="data-growth-factor mt-5">
            <Row className="justify-content-center gx-5">
              <Col md={5} className="text-center">
                <img
                  className="growth-factor-img img-fluid"
                  src={pageData.image || defaultImage}
                  alt="Изображение"
                />
              </Col>
              <Col md={5} className="growth-factor-description">
                <p className="title">{pageData.title}</p>
                <div className="ver">
                  <p>{pageData.description}</p>
                  <p>Коэффициент: {pageData.coeff}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div className="album_page_loader_block">{/* загрузка */}
          <Spinner animation="border" />
        </div>
      )}
    </div>

  );
};