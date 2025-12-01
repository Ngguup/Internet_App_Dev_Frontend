import "./VacancyApplicationPage.css"
import { FC } from 'react';
import { Col, Row, Image, Alert, Form, Button } from "react-bootstrap";

import { ROUTES } from '../../Routes';
import { ROUTE_LABELS } from '../../Routes';
import default_image from "/DefaultImage.jpg";
import { DataGrowthFactorCard } from "../../components/DataGrowthFactorCard/DataGrowthFactorCard";
import BasicExample from "../../components/BasicExample/BasicExample";

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getVacancyApplication, } from '../../slices/vacancyApplicationDraftSlice';
import { deleteVacancyApplication, setError } from '../../slices/vacancyApplicationDraftSlice';

import { setVacancyData } from '../../slices/vacancyApplicationDraftSlice';
import { updateVacancyApplication } from '../../slices/vacancyApplicationDraftSlice';

const VacancyApplicationPage: FC = () => {
  const { app_id } = useParams();
  const app_id_num = Number(app_id)

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    factors,
    growth_request,
    error,
  } = useSelector((state: RootState) => state.vacancyApplicationDraft);
  const isDraft = useSelector((state: RootState) => state.vacancyApplicationDraft.isDraft);

  useEffect(() => {
    if (app_id) {
      dispatch(getVacancyApplication(app_id_num));
    }
  }, [dispatch]);

  const handleCardClick = (city_id: number | undefined) => {
    navigate(`${ROUTES.DATA_GROWTH_FACTORS}/${city_id}`);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (app_id) {
      try {
        await dispatch(deleteVacancyApplication(app_id_num)).unwrap();
      navigate(ROUTES.DATA_GROWTH_FACTORS);
      } catch (error) {
        dispatch(setError(error));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(
        setVacancyData({
            ...growth_request,
            [name]: value,
        })
    );
  };

  const handleSaveVacancy = () => {
    if (app_id) {
      const growthRequestDataToSend = {
        CurData: growth_request.CurData ?? NaN,
        StartPeriod: growth_request.StartPeriod ?? '',
        EndPeriod: growth_request.EndPeriod ?? ''
      };
      try {
        dispatch(updateVacancyApplication({ appId: app_id_num, growthRequestData: growthRequestDataToSend }));
      } catch (error) {
        dispatch(setError(error));
      }
    }
  }

  return (
    <div>
      <BasicExample />
      <div className="container-2">  
        <div className="fav-content">
          {error && <Alert variant="danger" style={{ width: '15vw'}}>{error}</Alert>}
          <Row>
              <Col md={8} xs={8}>
                <h1>Вакансия</h1>
              </Col>
              <Col md={4} xs={4}>
                <Image src={default_image}></Image>
              </Col>
          </Row>
          {(!isDraft) ? (
            <div>
                <h4>Название вакансии: {growth_request.CurData}</h4>
                <h4>Обязанности: {growth_request.StartPeriod}</h4>
                <h4>Требования: {growth_request.EndPeriod}</h4>
            </div>
            ) : (
            <div>
                <Form.Group controlId="CurData">
                <h4>Название вакансии</h4>
                <Form.Control
                    type="text"
                    name="CurData"
                    value={growth_request.CurData ?? ''}
                    onChange={handleInputChange}
                    required
                    // disabled={!isDraft}
                />
                </Form.Group>

                <Form.Group controlId="StartPeriod">
                <h4>Обязанности</h4>
                <Form.Control
                    as="textarea"
                    name="StartPeriod"
                    value={growth_request.StartPeriod ?? ''}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    // disabled={!isDraft}
                />
                </Form.Group>

                <Form.Group controlId="EndPeriod">
                <h4>Требования</h4>
                <Form.Control
                    as="textarea"
                    name="EndPeriod"
                    value={growth_request.EndPeriod ?? ''} 
                    onChange={handleInputChange}
                    rows={4}
                    required
                    // disabled={!isDraft}
                />
                </Form.Group>

                <Button type="submit" className="save-button" onClick={handleSaveVacancy}>
                    Сохранить
                </Button>
            </div>
            )}
          <h1>Выбранные города для размещения Вашей вакансии</h1>
          <div className="cards-wrapper-2 d-flex flex-column">
            {factors.length ? (
              factors.map((item) => (
                <Col key={item.ID}>
                  <DataGrowthFactorCard
                    id={item.ID}
                    image={item.Image}
                    title={item.Attribute}
                    coeff={item.Coeff}
                    imageClickHandler={() => handleCardClick(item.ID)}
                    factors={factors}
                    app_id={app_id}
                    isDraft={isDraft}
                  />
                </Col>
              ))
            ) : (
              <section className="cities-not-found">
                <h1>К сожалению, пока ничего не найдено :(</h1>
              </section>
            )}
          </div>
        </div>

        {/* ??? */}
        {(isDraft) && (
            <Button className="save-button" onClick={handleDelete}>
                Очистить
            </Button>
        )}
      </div>
    </div>
  );
};

export default VacancyApplicationPage;