import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataGrowthFactorPage } from "./pages/DataGrowthFactorPage";
import GrowthForecastPage from "./pages/GrowthForecastPage";
import { ROUTES } from "./Routes";
import { HomePage } from "./pages/HomePage";

function App() {
  useEffect(() => {
    invoke("tauri", { cmd: "create" })
      .then(() => console.log("Tauri launched"))
      .catch(() => console.log("Tauri not launched"));

    return () => {
      invoke("tauri", { cmd: "close" })
        .then(() => console.log("Tauri closed"))
        .catch(() => console.log("Tauri close failed"));
    };
  }, []);


  return (
    // <BrowserRouter basename={("__TAURI__" in window) ? "/" : "/Internet_App_Dev_Frontend"}>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.DATA_GROWTH_FACTORS} element={<GrowthForecastPage />} />
        <Route path={`${ROUTES.DATA_GROWTH_FACTORS}/:id`} element={<DataGrowthFactorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;