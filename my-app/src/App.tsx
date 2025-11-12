import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataGrowthFactorPage } from "./pages/DataGrowthFactorPage";
import GrowthForecastPage from "./pages/GrowthForecastPage";
import { ROUTES } from "./Routes";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter basename="/my-app">
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.DATA_GROWTH_FACTORS} element={<GrowthForecastPage />} />
        <Route path={`${ROUTES.DATA_GROWTH_FACTORS}/:id`} element={<DataGrowthFactorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;