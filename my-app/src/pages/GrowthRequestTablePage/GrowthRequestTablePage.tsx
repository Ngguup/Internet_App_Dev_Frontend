import { FC, useEffect, useState } from "react";
import { Button, Alert, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useNavigate } from "react-router-dom";

import { getGrowthRequestsList } from "../../slices/growthRequestTableSlice";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import BasicExample from "../../components/BasicExample/BasicExample";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import "./GrowthRequestTablePage.css";

import GrowthRequestTableInputField from "../../components/GrowthRequestTableInputField/GrowthRequestTableInputField";

const GrowthRequestTablePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { searchStatus, startDate, endDate, growthRequests, error } = useSelector(
    (state: RootState) => state.growthRequestTable
  );

  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getGrowthRequestsList());
  }, [dispatch]);

  const handleCardClick = (id: number) => {
    setSelectedId(id);
  };

  const handleNavigate = () => {
    if (selectedId !== null) {
      navigate(`${ROUTES.VACANCYAPPLICATION}/${selectedId}`);
    }
  };

  return (
    <div>
      <BasicExample />
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.DATA_GROWTH_FACTORS, path: ROUTES.DATA_GROWTH_FACTORS },
          { label: ROUTE_LABELS.GROWTH_REQUEST_TABLE },
        ]}
      />

      <div className="container mt-5 pt-5">
        <h2 className="mb-4 mt-5">Таблица заявок на расчёт роста объёма данных</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <GrowthRequestTableInputField
          status={searchStatus}
          startDate={startDate}
          endDate={endDate}
        />

        {/* 👉 Заголовок полей (один раз) */}
        <Row className="growth-card-header">
          <Col>ID</Col>
          <Col>Статус</Col>
          <Col>Дата создания</Col>
          <Col>Дата формирования</Col>
          <Col>Результат</Col>
        </Row>

        {/* 👉 Карточки */}
        {growthRequests.length > 0 ? (
          growthRequests.map((row) => (
            <Row
              key={row.id}
              className={`growth-card ${selectedId === row.id ? "growth-card-selected" : ""}`}
              onClick={() => handleCardClick(row.id)}
            >
              <Col>{row.id}</Col>
              <Col>{row.status}</Col>
              <Col>{row.date_create}</Col>
              <Col>{row.date_update}</Col>
              <Col>{row.result}</Col>
            </Row>
          ))
        ) : (
          <p className="text-center mt-3">Заявки не найдены</p>
        )}

        <Button
          className="mt-3"
          variant="outline-secondary"
          disabled={selectedId === null}
          onClick={handleNavigate}
        >
          Перейти
        </Button>
      </div>
    </div>
  );
};

export default GrowthRequestTablePage;
