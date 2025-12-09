import "./GrowthRequestPage.css"
import { FC } from 'react';
import { Col, Form, Button } from "react-bootstrap";

import { ROUTES } from '../../Routes';
import { DataGrowthFactorCard } from "../../components/DataGrowthFactorCard/DataGrowthFactorCard";
import BasicExample from "../../components/BasicExample/BasicExample";

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getGrowthRequest, } from '../../slices/growthRequestDraftSlice';
import { deleteGrowthRequest, formGrowthRequest, setError } from '../../slices/growthRequestDraftSlice';

import { setGrowthRequestData } from '../../slices/growthRequestDraftSlice';
import { updateGrowthRequest } from '../../slices/growthRequestDraftSlice';

const GrowthRequestPage: FC = () => {
  const { app_id } = useParams();
  const app_id_num = Number(app_id)

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    factors,
    growth_request,
  } = useSelector((state: RootState) => state.growthRequestDraft);
  const isDraft = useSelector((state: RootState) => state.growthRequestDraft.isDraft);

  useEffect(() => {
    if (app_id) {
      dispatch(getGrowthRequest(app_id_num));
    }
  }, [dispatch]);

  const handleCardClick = (city_id: number | undefined) => {
    navigate(`${ROUTES.DATA_GROWTH_FACTORS}/${city_id}`);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (app_id) {
      try {
        await dispatch(deleteGrowthRequest(app_id_num)).unwrap();
      navigate(ROUTES.DATA_GROWTH_FACTORS);
      } catch (error) {
        dispatch(setError(error));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(
        setGrowthRequestData({
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
        dispatch(updateGrowthRequest({ appId: app_id_num, growthRequestData: growthRequestDataToSend }));
      } catch (error) {
        dispatch(setError(error));
      }
    }
  }

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (app_id) {
      try {
        await dispatch(formGrowthRequest(app_id_num)).unwrap();
      navigate(ROUTES.DATA_GROWTH_FACTORS);
      } catch (error) {
        dispatch(setError(error));
      }
    }
  };

  return (
    <div className="growth-request-page">
      <BasicExample />
      <div className="growth-request-list">
        {(!isDraft) ? (
        <div className="result-data-growth-factor-card">
          <div className="aligned-text-hor">
              <p>Прогноз роста объема данных на основе выбранных параметров:</p>
              <p className="result">?</p>
          </div>
          <p>Текущее количество данных: { growth_request.CurData }</p>
          <p>Начало периода: { growth_request.StartPeriod }</p>
          <p>Конец периода: { growth_request.EndPeriod }</p>
        </div>
        ) : (
        <div className="result-data-growth-factor-card">
            <div className="aligned-text-hor">
                <p>Прогноз роста объема данных на основе выбранных параметров:</p>
                <p className="result">?</p>
            </div>
            {/* <div className="aligned-text-hor">
                <p>Текущее количество данных (б):</p>
                <p className="input">{ growth_request.CurData }</p>
            </div> */}
            <Form.Group controlId="CurData" className="aligned-text-hor">
              <p>Текущее количество данных:</p>
              <Form.Control
                  className="input ms-2"
                  type="text"
                  name="CurData"
                  value={growth_request.CurData ?? ''}
                  onChange={handleInputChange}
                  required
                  // disabled={!isDraft}
              />
            </Form.Group>
            <Form.Group controlId="StartPeriod" className="aligned-text-hor">
              <p>Начало периода:</p>
              <Form.Control
                  className="input ms-2"
                  type="text"
                  name="StartPeriod"
                  value={growth_request.StartPeriod ?? ''}
                  onChange={handleInputChange}
                  required
                  // disabled={!isDraft}
              />
            </Form.Group>
            <Form.Group controlId="EndPeriod" className="aligned-text-hor">
              <p>Конец периода:</p>
              <Form.Control
                  className="input ms-2"
                  type="text"
                  name="EndPeriod"
                  value={growth_request.EndPeriod ?? ''}
                  onChange={handleInputChange}
                  required
                  // disabled={!isDraft}
              />
            </Form.Group>
          
        </div>
        )}
        {(isDraft) && (
        <Button type="submit" className="delete-btn" onClick={handleSaveVacancy}>Сохранить прогноз</Button>
        )}
        {/* {{ range $i, $factor := .dataGrowthFactors }}
        <div class="data-growth-factor-card">
            <div class="aligned-text-hor">
                <p>{{ $factor.Attribute }}:</p> <p class="input">{{ index $.factorNums $i }}</p>
            </div>

            <div class="data-growth-factor-card-field">
                <img class="data-growth-factor-card-img" src="{{ $factor.Image }}" alt="Изображние">
                <p>Коэффициент: {{ $factor.Coeff }}</p>
            </div>
        </div>
        {{ end }} */}
        {factors.length ? (
          factors.map((item) => (
            <Col key={item.ID}>
              <DataGrowthFactorCard
                id={item.ID}
                image={item.Image}
                title={item.Attribute}
                coeff={item.Coeff}
                factorNum={item.FactorNum}
                imageClickHandler={() => handleCardClick(item.ID)}
                factors={factors}
                app_id={app_id}
                isDraft={isDraft}
              />
            </Col>
          ))
        ) : (
          <section className="factors-not-found">
            <h1>К сожалению, пока ничего не найдено :(</h1>
          </section>
      )}
      {(isDraft) && (
          <div>
            <Button className="delete-btn" onClick={handleForm}>
                Сформировать
            </Button>
            <Button className="delete-btn ms-2" onClick={handleDelete}>
                Очистить
            </Button>
          </div>
      )}
      </div>
    </div>
  );
};

export default GrowthRequestPage;