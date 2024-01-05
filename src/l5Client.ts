import { Filter, Paginator } from "./types";

export default class l5Client {
  private _baseUrl: string;
  private _route: string = "";
  private _headers: Record<string, string> = {};
  private _queryParams: { [key: string]: string } = {};

  constructor(baseUrl: string, headers: Record<string, string> = {}) {
    this._baseUrl = baseUrl.replace(/^\/?|\/?$/g, "");
    this._headers = headers;
  }

  route(route: string): this {
    this._route = route.replace(/^\/?|\/?$/g, "");
    this._queryParams = {};
    return this;
  }

  // auth(username: string, password: string): this {
  //   this._url.username = username
  //   this._url.password = password
  //   return this
  // }

  search(key: string, operator: string, value: string): this {
    this._queryParams[Filter.QueryParamKeys.SearchFields] =
      (this._queryParams[Filter.QueryParamKeys.SearchFields] || "") +
      `${key}:${operator};`;
    this._queryParams[Filter.QueryParamKeys.Search] =
      (this._queryParams[Filter.QueryParamKeys.Search] || "") +
      `${key}:${value};`;
    return this;
  }

  paginate(page: number = 1, perPage: number = 20): this {
    this._queryParams[Filter.QueryParamKeys.Page] = page.toString();
    this._queryParams[Filter.QueryParamKeys.PerPage] = perPage.toString();
    return this;
  }

  order(direction: Filter.OrderDirection, column: string): this;
  order(
    direction: Filter.OrderDirection,
    column: string,
    joinTable?: string
  ): this;
  order(
    direction: Filter.OrderDirection,
    column: string,
    joinTable?: string,
    joinColumn?: string
  ): this;
  order(
    direction: Filter.OrderDirection,
    column: string,
    joinTable?: string,
    joinColumn?: string
  ): this {
    if (joinTable === undefined && joinColumn === undefined) {
      // 1. order by own table column
      this._queryParams[Filter.QueryParamKeys.OrderBy] = (
        (this._queryParams[Filter.QueryParamKeys.OrderBy] || "") + `${column};`
      ).replace(/^\;?|\;?$/g, "");
    } else if (joinTable !== undefined && joinColumn === undefined) {
      // 2. order by join table column
      this._queryParams[Filter.QueryParamKeys.OrderBy] = (
        (this._queryParams[Filter.QueryParamKeys.OrderBy] || "") +
        `${joinTable}|${column};`
      ).replace(/^\;?|\;?$/g, "");
    } else if (joinTable !== undefined && joinColumn !== undefined) {
      // 3. order by join table column and specify join column
      this._queryParams[Filter.QueryParamKeys.OrderBy] = (
        (this._queryParams[Filter.QueryParamKeys.OrderBy] || "") +
        `${joinTable}:${joinColumn}|${column};`
      ).replace(/^\;?|\;?$/g, "");
    }
    this._queryParams[Filter.QueryParamKeys.OrderDir] = (
      (this._queryParams[Filter.QueryParamKeys.OrderDir] || "") + `${direction}`
    ).replace(/^\;?|\;?$/g, "");
    return this;
  }

  async fetch<T>(): Promise<T[] | Paginator<T>> {
    const res = await fetch(this.buildUrl(), {
      method: "GET",
      headers: this._headers,
    });
    return await res.json();
  }

  private buildUrl(): string {
    const url = new URL(`${this._baseUrl}/${this._route}`);
    Object.entries(this._queryParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, value.toString());
      }
    });
    console.log("--- URL:", url);

    return url.toString();
  }
}
