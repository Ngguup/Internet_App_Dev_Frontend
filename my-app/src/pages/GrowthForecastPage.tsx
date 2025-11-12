import "./GrowthForecastPage.css";
import { FC, useState, useEffect } from "react";
import { Spinner, Button } from "react-bootstrap";
import { DataGrowthFactor, getCartInfo, getDataGrowthFactorsByFilter } from "../modules/GrowthForecastApi";
import InputField from "../components/InputField/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { DataGrowthFactorCard } from "../components/DataGrowthFactorCard/DataGrowthFactorCard";
import { useNavigate } from "react-router-dom";
import { DATA_GROWTH_FACTORS_MOCK } from "../modules/mock";
import BasicExample from "../components/BasicExample/BasicExample";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setSearch, setMinCoeff, setMaxCoeff } from "../store/filterReducer";


const GrowthForecastPage: FC = () => {
  // const [searchValue, setSearchValue] = useState("");
  // const [minCoeff, setMinCoeff] = useState("")
  // const [maxCoeff, setMaxCoeff] = useState("")
  const dispatch = useDispatch();
  const { searchValue, minCoeff, maxCoeff } = useSelector((state: RootState) => state.filter);


  const [loading, setLoading] = useState(false);
  const [dgf, setDgf] = useState<DataGrowthFactor[]>([]);

  const [grCart, setGrCart] = useState(0)

  const navigate = useNavigate();

  const handleSearch = () => {
    setLoading(true);
    getDataGrowthFactorsByFilter(searchValue, minCoeff, maxCoeff)
      .then((response) => {
        setDgf(
          response
        );
        setLoading(false);
      })
      .catch(() => { 
        setDgf(
          DATA_GROWTH_FACTORS_MOCK.filter((item) =>
            item.Title
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase())
          )
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    handleSearch();
    getCartInfo()
    .then((response) => setGrCart(response.service_count))
    .catch(() => setGrCart(0))
  }, []);

  const handleCardClick = (id: number) => {
    navigate(`${ROUTES.DATA_GROWTH_FACTORS}/${id}`);
  };

  return (
    <div>
      <header><BasicExample></BasicExample></header>
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.DATA_GROWTH_FACTORS }]} />
      
      {loading && ( 
        <div className="loadingBg">
          <Spinner animation="border" />
        </div>
      )}
      {!loading &&
        (!dgf.length ? (
          <div>
            <h1>К сожалению, пока ничего не найдено :(</h1>
          </div>
        ) : (
          <div className="growth-forecast-page">
            <Button variant="outline-light" className="growth-request-img" onClick={() => {return 0;}}>{ grCart }</Button>
            {/* <InputField
              value={searchValue}
              setValue={(value) => setSearchValue(value)}
              minCoeff={minCoeff}
              setMinCoeff={(minCoeff) => setMinCoeff(minCoeff)}
              maxCoeff={maxCoeff}
              setMaxCoeff={(maxCoeff) => setMaxCoeff(maxCoeff)}

              loading={loading}
              onSubmit={handleSearch}
            /> */}
            <InputField
              value={searchValue}
              setValue={(value) => dispatch(setSearch(value))}
              minCoeff={minCoeff}
              setMinCoeff={(value) => dispatch(setMinCoeff(value))}
              maxCoeff={maxCoeff}
              setMaxCoeff={(value) => dispatch(setMaxCoeff(value))}
              loading={loading}
              onSubmit={handleSearch}
            />

            <div className="cards-grid mt-4">
              {dgf.map((item, index) => (
                <DataGrowthFactorCard
                  key={index}
                  imageClickHandler={() => handleCardClick(item.ID)}
                  {...item}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default GrowthForecastPage;