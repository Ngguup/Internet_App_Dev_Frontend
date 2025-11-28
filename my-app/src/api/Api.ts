/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface DsDataGrowthFactor {
  attribute?: string;
  coeff?: number;
  description?: string;
  id?: number;
  image?: string;
  isDelete?: boolean;
  title?: string;
}

export interface HandlerFormattedGrowthRequest {
  Creator?: string;
  CurData?: number;
  DateCreate?: string;
  DateFinish?: string;
  DateUpdate?: string;
  EndPeriod?: string;
  ID?: number;
  Moderator?: string;
  Result?: number;
  StartPeriod?: string;
  Status?: string;
}

export interface HandlerLoginReq {
  login?: string;
  password?: string;
}

export interface HandlerLoginResp {
  access_token?: string;
  token_type?: string;
}

export interface HandlerRegisterReq {
  /** лучше назвать то же самое что login */
  login?: string;
  password?: string;
}

export interface HandlerRegisterResp {
  ok?: boolean;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://127.0.0.1:8080",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Data Growth Forecast
 * @version 1.0
 * @baseUrl http://127.0.0.1:8080
 * @contact Belikov Konstantin <konstantinbelicov@gmail.com>
 *
 * BMSTU Open IT Platform. API для работы с факторами роста данных, запросами на прогноз и пользователями.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Возвращает все услуги (факторы роста) с возможностью фильтрации по названию
     *
     * @tags data_growth_factors
     * @name DataGrowthFactorsList
     * @summary Получить список услуг
     * @request GET:/api/data-growth-factors
     */
    dataGrowthFactorsList: (
      query?: {
        /** Фильтр по названию2 */
        title?: string;
        /** Минимальный коэффициент */
        min_coeff?: string;
        /** Максимальный коэффициент */
        max_coeff?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<DsDataGrowthFactor[], any>({
        path: `/api/data-growth-factors`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Создаёт новую услугу (фактор роста)
     *
     * @tags data_growth_factors
     * @name DataGrowthFactorsCreate
     * @summary Добавить услугу
     * @request POST:/api/data-growth-factors
     */
    dataGrowthFactorsCreate: (
      data: DsDataGrowthFactor,
      params: RequestParams = {},
    ) =>
      this.request<DsDataGrowthFactor, any>({
        path: `/api/data-growth-factors`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает услугу (фактор роста) по её идентификатору
     *
     * @tags data_growth_factors
     * @name DataGrowthFactorsDetail
     * @summary Получить услугу по ID
     * @request GET:/api/data-growth-factors/{id}
     */
    dataGrowthFactorsDetail: (id: number, params: RequestParams = {}) =>
      this.request<DsDataGrowthFactor, Record<string, string>>({
        path: `/api/data-growth-factors/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет информацию об услуге (факторе роста)
     *
     * @tags data_growth_factors
     * @name DataGrowthFactorsUpdate
     * @summary Обновить услугу
     * @request PUT:/api/data-growth-factors/{id}
     */
    dataGrowthFactorsUpdate: (
      id: number,
      data: DsDataGrowthFactor,
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, any>({
        path: `/api/data-growth-factors/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаляет услугу (меняет флаг удаления или полностью удаляет запись)
     *
     * @tags data_growth_factors
     * @name DataGrowthFactorsDelete
     * @summary Удалить услугу
     * @request DELETE:/api/data-growth-factors/{id}
     */
    dataGrowthFactorsDelete: (id: number, params: RequestParams = {}) =>
      this.request<Record<string, string>, Record<string, string>>({
        path: `/api/data-growth-factors/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Добавляет выбранную услугу в текущую заявку пользователя со статусом "черновик"
     *
     * @tags data_growth_factors
     * @name DataGrowthFactorsAddCreate
     * @summary Добавить услугу в заявку-черновик
     * @request POST:/api/data-growth-factors/{id}/add
     */
    dataGrowthFactorsAddCreate: (id: number, params: RequestParams = {}) =>
      this.request<Record<string, string>, any>({
        path: `/api/data-growth-factors/${id}/add`,
        method: "POST",
        ...params,
      }),

    /**
     * @description Загружает изображение в MinIO и сохраняет URL в базе данных
     *
     * @tags data_growth_factors
     * @name DataGrowthFactorsImageCreate
     * @summary Загрузить изображение услуги
     * @request POST:/api/data-growth-factors/{id}/image
     */
    dataGrowthFactorsImageCreate: (
      id: number,
      data: {
        /** Изображение */
        image: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, string>, any>({
        path: `/api/data-growth-factors/${id}/image`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет числовое значение factor_num для DataGrowthFactor в корзине текущего пользователя
     *
     * @tags growth_request_data_growth_factors
     * @name GrowthRequestDataGrowthFactorsUpdate
     * @summary Обновить значение factor_num
     * @request PUT:/api/growth-request-data-growth-factors/{id}
     */
    growthRequestDataGrowthFactorsUpdate: (
      id: number,
      body: object,
      params: RequestParams = {},
    ) =>
      this.request<Record<string, string>, Record<string, string>>({
        path: `/api/growth-request-data-growth-factors/${id}`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаляет DataGrowthFactor из черновика текущего пользователя
     *
     * @tags growth_request_data_growth_factors
     * @name GrowthRequestDataGrowthFactorsDelete
     * @summary Удалить фактор роста из черновика
     * @request DELETE:/api/growth-request-data-growth-factors/{id}
     */
    growthRequestDataGrowthFactorsDelete: (
      id: number,
      params: RequestParams = {},
    ) =>
      this.request<Record<string, string>, Record<string, string>>({
        path: `/api/growth-request-data-growth-factors/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает все заявки с фильтрацией по статусу и дате
     *
     * @tags growth_requests
     * @name GrowthRequestsList
     * @summary Получить список заявок на рост
     * @request GET:/api/growth-requests
     */
    growthRequestsList: (
      query?: {
        /** Статус заявки */
        status?: string;
        /** Дата начала периода (формат: 02.01.06) */
        start_date?: string;
        /** Дата конца периода (формат: 02.01.06) */
        end_date?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>[], Record<string, string> | void>({
        path: `/api/growth-requests`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает данные о корзине в зависимости от роли (creator или moderator)
     *
     * @tags growth_requests
     * @name GrowthRequestsCartList
     * @summary Получение информации о корзине пользователя
     * @request GET:/api/growth-requests/cart
     */
    growthRequestsCartList: (params: RequestParams = {}) =>
      this.request<Record<string, any>, void | Record<string, string>>({
        path: `/api/growth-requests/cart`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает заявку и связанные с ней факторы
     *
     * @tags growth_requests
     * @name GrowthRequestsDetail
     * @summary Получить заявку по ID
     * @request GET:/api/growth-requests/{id}
     */
    growthRequestsDetail: (id: number, params: RequestParams = {}) =>
      this.request<Record<string, any>, Record<string, string>>({
        path: `/api/growth-requests/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет данные заявки (текущие данные, период)
     *
     * @tags growth_requests
     * @name GrowthRequestsUpdate
     * @summary Обновить заявку на рост
     * @request PUT:/api/growth-requests/{id}
     */
    growthRequestsUpdate: (
      id: number,
      input: object,
      params: RequestParams = {},
    ) =>
      this.request<HandlerFormattedGrowthRequest, Record<string, string>>({
        path: `/api/growth-requests/${id}`,
        method: "PUT",
        body: input,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаляет заявку пользователя
     *
     * @tags growth_requests
     * @name GrowthRequestsDelete
     * @summary Удалить заявку на рост
     * @request DELETE:/api/growth-requests/{id}
     */
    growthRequestsDelete: (id: number, params: RequestParams = {}) =>
      this.request<Record<string, string>, Record<string, string>>({
        path: `/api/growth-requests/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description Меняет статус заявки на завершен или отклонен
     *
     * @tags growth_requests
     * @name GrowthRequestsCompleteUpdate
     * @summary Завершить или отклонить заявку
     * @request PUT:/api/growth-requests/{id}/complete
     */
    growthRequestsCompleteUpdate: (
      id: number,
      query: {
        /** Действие (complete или reject) */
        action: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, Record<string, string>>({
        path: `/api/growth-requests/${id}/complete`,
        method: "PUT",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Изменяет статус черновика на "сформирован" при наличии всех обязательных полей
     *
     * @tags growth_requests
     * @name GrowthRequestsFormUpdate
     * @summary Сформировать заявку на рост
     * @request PUT:/api/growth-requests/{id}/form
     */
    growthRequestsFormUpdate: (id: number, params: RequestParams = {}) =>
      this.request<Record<string, any>, Record<string, string>>({
        path: `/api/growth-requests/${id}/form`,
        method: "PUT",
        format: "json",
        ...params,
      }),

    /**
     * @description Аутентификация пользователя и выдача JWT
     *
     * @tags users
     * @name UsersLoginCreate
     * @summary Вход пользователя
     * @request POST:/api/users/login
     */
    usersLoginCreate: (body: HandlerLoginReq, params: RequestParams = {}) =>
      this.request<HandlerLoginResp, Record<string, string> | void>({
        path: `/api/users/login`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Разлогинивает пользователя и добавляет JWT в черный список
     *
     * @tags users
     * @name UsersLogoutCreate
     * @summary Выход пользователя
     * @request POST:/api/users/logout
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, Record<string, string>>({
        path: `/api/users/logout`,
        method: "POST",
        ...params,
      }),

    /**
     * @description Возвращает информацию о текущем пользователе
     *
     * @tags users
     * @name UsersMeList
     * @summary Получить текущего пользователя
     * @request GET:/api/users/me
     */
    usersMeList: (params: RequestParams = {}) =>
      this.request<Record<string, any>, Record<string, string>>({
        path: `/api/users/me`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет логин, пароль и роль текущего пользователя
     *
     * @tags users
     * @name UsersMeUpdate
     * @summary Обновить пользователя
     * @request PUT:/api/users/me
     */
    usersMeUpdate: (body: object, params: RequestParams = {}) =>
      this.request<Record<string, string>, Record<string, string>>({
        path: `/api/users/me`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Создает нового пользователя с ролью Creator
     *
     * @tags users
     * @name UsersRegisterCreate
     * @summary Регистрация пользователя
     * @request POST:/api/users/register
     */
    usersRegisterCreate: (
      body: HandlerRegisterReq,
      params: RequestParams = {},
    ) =>
      this.request<HandlerRegisterResp, Record<string, string>>({
        path: `/api/users/register`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
