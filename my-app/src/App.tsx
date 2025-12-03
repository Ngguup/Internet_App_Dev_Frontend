import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataGrowthFactorPage } from "./pages/DataGrowthFactorPage";
import GrowthForecastPage from "./pages/GrowthForecastPage";
import { ROUTES } from "./Routes";
import { HomePage } from "./pages/HomePage";
import { dest_root } from "../target_config";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage"
import UpdateUserPage from "./pages/UpdateUserPage/UpdateUserPage";
import GrowthRequestPage from "./pages/GrowthRequestPage/GrowthRequestPage"
import GrowthRequestTablePage from "./pages/GrowthRequestTablePage/GrowthRequestTablePage";

function App() {
  return (
    // <BrowserRouter basename={("__TAURI__" in window) ? "/" : "/Internet_App_Dev_Frontend"}>
    <BrowserRouter basename={dest_root}>
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.DATA_GROWTH_FACTORS} element={<GrowthForecastPage />} />
        <Route path={`${ROUTES.DATA_GROWTH_FACTORS}/:id`} element={<DataGrowthFactorPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.ACCOUNT} element={<UpdateUserPage />} />
        <Route path={`${ROUTES.VACANCYAPPLICATION}/:app_id`} element={<GrowthRequestPage />} />
        <Route path={ROUTES.GROWTH_REQUEST_TABLE} element={<GrowthRequestTablePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;