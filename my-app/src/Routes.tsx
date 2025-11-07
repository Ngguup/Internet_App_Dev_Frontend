export const ROUTES = {
  HOME: "/",
  DATA_GROWTH_FACTORS: "/factors",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  HOME: "Главная",
  DATA_GROWTH_FACTORS: "Факторы Роста",
};