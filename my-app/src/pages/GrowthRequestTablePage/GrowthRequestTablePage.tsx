import { FC, useEffect, useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
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

  const { searchStatus, startDate, endDate, growthRequests, loading, error } = useSelector(
    (state: RootState) => state.growthRequestTable
  );

  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getGrowthRequestsList());
  }, [dispatch]);

  const handleRowClick = (id: number) => {
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
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Статус</th>
              <th>Дата создания</th>
              <th>Дата формирования</th>
              <th>Результат</th>
            </tr>
          </thead>
          <tbody>
            {growthRequests.length > 0 ? (
              growthRequests.map(row => (
                <tr
                    key={row.id}
                    onClick={() => handleRowClick(row.id)}
                    className={selectedId === row.id ? "table-row-selected" : ""}
                    style={{ cursor: "pointer" }}
                >
                <td>{row.id}</td>
                <td>{row.status}</td>
                <td>{row.date_create}</td>
                <td>{row.date_update}</td>
                <td>{row.result}</td>
                </tr>

              ))
            ) : (
              <tr>
                <td colSpan={4}>Заявки не найдены</td>
              </tr>
            )}
          </tbody>
        </Table>

        <Button
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
