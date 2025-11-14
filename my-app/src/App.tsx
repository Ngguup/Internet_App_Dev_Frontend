import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataGrowthFactorPage } from "./pages/DataGrowthFactorPage";
import GrowthForecastPage from "./pages/GrowthForecastPage";
import { ROUTES } from "./Routes";
import { HomePage } from "./pages/HomePage";
import { dest_root } from "../target_config";

function App() {
  return (
    // <BrowserRouter basename={("__TAURI__" in window) ? "/" : "/Internet_App_Dev_Frontend"}>
    <BrowserRouter basename={dest_root}>
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.DATA_GROWTH_FACTORS} element={<GrowthForecastPage />} />
        <Route path={`${ROUTES.DATA_GROWTH_FACTORS}/:id`} element={<DataGrowthFactorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;