import { FC, useEffect, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useNavigate } from "react-router-dom";

import { getGrowthRequestsList } from "../../slices/growthRequestTableSlice";
import { completeGrowthRequest, rejectGrowthRequest } from "../../slices/growthRequestTableSlice";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import BasicExample from "../../components/BasicExample/BasicExample";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";

import GrowthRequestTableInputField from "../../components/GrowthRequestTableInputField/GrowthRequestTableInputField";
import "./GrowthRequestTablePage.css";

const GrowthRequestTablePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { searchStatus, startDate, endDate, growthRequests, error } =
    useSelector((state: RootState) => state.growthRequestTable);

  const { isModerator } = useSelector((state: RootState) => state.user);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  useEffect(() => {
    dispatch(getGrowthRequestsList());
  }, [dispatch]);

  const handleRowClick = (id: number, status: string) => {
    setSelectedId(id);
    setSelectedStatus(status);
  };

  const handleNavigate = () => {
    if (selectedId !== null) {
      navigate(`${ROUTES.VACANCYAPPLICATION}/${selectedId}`);
    }
  };

  const handleComplete = () => {
    dispatch(completeGrowthRequest(selectedId!))
  }
  const handleReject = () => {
    dispatch(rejectGrowthRequest(selectedId!))
  }

  return (
    <div>
      <BasicExample />
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.DATA_GROWTH_FACTORS, path: ROUTES.DATA_GROWTH_FACTORS },
          { label: ROUTE_LABELS.GROWTH_REQUEST_TABLE },
        ]}
      />
      <div className="container growth pt-5 mt-5">
        <h3 className="mb-4">Таблица прогнозов на расчёт роста объёма данных</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <GrowthRequestTableInputField
          status={searchStatus}
          startDate={startDate}
          endDate={endDate}
        />

        {/* ---------------- Заголовок как карточка ---------------- */}
        <div className="growth-card-header">
          <div>ID</div>
          <div>Состояние прогноза</div>
          <div>Дата создания</div>
          <div>Дата подачи</div>
          <div>Текущий прогноз</div>
        </div>

        {/* ---------------- Карточки строк ---------------- */}
        <div className="growth-cards-container">
          {growthRequests.length > 0 ? (
            growthRequests.map((row) => (
              <div
                key={row.id}
                className={`growth-card ${selectedId === row.id ? "growth-card-selected" : ""}`}
                onClick={() => handleRowClick(row.id, row.status)}
              >
                <div>{row.id}</div>
                <div>{row.status}</div>
                <div>{row.date_create}</div>
                <div>{row.date_update}</div>
                <div>{row.result}</div>
              </div>
            ))
          ) : (
            <div className="text-center mt-3">Заявки не найдены</div>
          )}
        </div>

        <div>
          <Button
            variant="outline-secondary"
            disabled={selectedId === null}
            onClick={handleNavigate}
            style={{ marginBlock: "10px" }}
          >
            Перейти
          </Button>
          {(isModerator && selectedStatus === "сформирован") && (
            <Button
            variant="outline-secondary"
            disabled={selectedId === null}
            onClick={handleComplete}
            style={{ marginBlock: "10px" }}
            className="ms-2"
          >
            Расчитать
          </Button>
          )}
          {(isModerator && selectedStatus === "сформирован") && (
            <Button
            variant="outline-secondary"
            disabled={selectedId === null}
            onClick={handleReject}
            style={{ marginBlock: "10px" }}
            className="ms-2"
          >
            Отклонить
          </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrowthRequestTablePage;
