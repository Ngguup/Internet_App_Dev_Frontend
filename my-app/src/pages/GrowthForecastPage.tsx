import "./GrowthForecastPage.css";
import { FC, useEffect } from "react";
import { Spinner, Button } from "react-bootstrap";
import InputField from "../components/InputField/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { DataGrowthFactorCard } from "../components/DataGrowthFactorCard/DataGrowthFactorCard";
import { useNavigate } from "react-router-dom";
// import { DATA_GROWTH_FACTORS_MOCK } from "../modules/mock";
import BasicExample from "../components/BasicExample/BasicExample";

import { getDataGrowthFactorsList } from '../slices/factorsSlice';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
// import { setSearch, setMinCoeff, setMaxCoeff } from "../store/filterReducer";

// import { DsDataGrowthFactor } from "../api/Api";


const GrowthForecastPage: FC = () => {
  // const [searchValue, setSearchValue] = useState("");
  // const [minCoeff, setMinCoeff] = useState("")
  // const [maxCoeff, setMaxCoeff] = useState("")
  const dispatch = useDispatch<AppDispatch>();
  // const { searchValue, minCoeff, maxCoeff } = useSelector((state: RootState) => state.filter);
  // const [loading, setLoading] = useState(false);
  // const [dgf, setDgf] = useState<DsDataGrowthFactor[]>([]);
  const navigate = useNavigate();

  const { searchValue, minCoeff, maxCoeff, dgf, loading } = useSelector((state: RootState) => state.dgf);

  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const app_id = useSelector((state: RootState) => state.growthRequestDraft.app_id);
  const count = useSelector((state: RootState) => state.growthRequestDraft.count);

  const handleClick = (app_id: number | null) => {
      navigate(`${ROUTES.VACANCYAPPLICATION}/${app_id}`);
  };

  // const handleSearch = () => {
  //   setLoading(true);
  //   getDataGrowthFactorsByFilter(searchValue, minCoeff, maxCoeff)
  //     .then((response) => {
  //       setDgf(
  //         response
  //       );
  //       setLoading(false);
  //     })
  //     .catch(() => { 
  //       setDgf(
  //         DATA_GROWTH_FACTORS_MOCK.filter((item) => {
  //           const matchesTitle = item.title!
  //             .toLocaleLowerCase()
  //             .includes(searchValue.toLocaleLowerCase());

  //           const min = minCoeff ? parseFloat(minCoeff) : -Infinity;
  //           const max = maxCoeff ? parseFloat(maxCoeff) : Infinity;

  //           const matchesCoeff = item.coeff! >= min && item.coeff! <= max;
  //           return matchesTitle && matchesCoeff;
  //         })
  //       );
  //       setLoading(false);
  //     });
  // };

  useEffect(() => {
    dispatch(getDataGrowthFactorsList());
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
            <Button 
            variant="outline-light" 
            className="growth-request-img" 
            onClick={() => handleClick(app_id? app_id : NaN)}
            disabled={(!isAuthenticated) || (!app_id)}
            >
              { (!isAuthenticated || !app_id) ? null : count }
            </Button>
            

            {/* <Button className="btn-favorites" onClick={() => handleClick(app_id? app_id : NaN)} disabled={(!isAuthenticated) || (!app_id)}>
              <img src={"./GrowthRequest.png"} alt="Избранное" />
              {(!isAuthenticated || !app_id) ? null : (
                  <span className="badge rounded-pill position-absolute">{count}</span>
              )}
            </Button> */}
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
              searchValue={searchValue}
              // setValue={(value) => dispatch(setSearch(value))}
              minCoeff={minCoeff}
              // setMinCoeff={(value) => dispatch(setMinCoeff(value))}
              maxCoeff={maxCoeff}
              // setMaxCoeff={(value) => dispatch(setMaxCoeff(value))}
              loading={loading}
              // onSubmit={handleSearch}
            />

            <div className="cards-grid mt-4">
              {dgf.map((item, index) => (
                <DataGrowthFactorCard
                  key={index}
                  imageClickHandler={() => handleCardClick(item.id!)}
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