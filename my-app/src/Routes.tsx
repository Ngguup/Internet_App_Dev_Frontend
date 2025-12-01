export const ROUTES = {
  HOME: "/",
  DATA_GROWTH_FACTORS: "/factors",
  REGISTER: "/registration",
  LOGIN: "/login",
  ACCOUNT: "/account",
  VACANCYAPPLICATION: "/vacancy_application",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  HOME: "Главная",
  DATA_GROWTH_FACTORS: "Факторы Роста",
  REGISTER: "Регистрация",
  LOGIN: "Авторизация",
  ACCOUNT: "Личный Кабинет",
  VACANCYAPPLICATION: "Заявки",
};