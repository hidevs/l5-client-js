import type { ApiClient, QueryParams, Paginator } from "./types";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

export class L5Client {
    private client: ApiClient;
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl.replace(/^\/?|\/?$/g, "");
        this.client = axios.create({ baseURL: this.baseUrl, headers: {Accept: 'application/json'} });
    }

    async all<T>(route: string, queryParams: Omit<QueryParams, "pagination">): Promise<T[]> {
        const params = this.buildQueryParams(queryParams);
        const { data } = await this.client.get<T[]>(route, { params });
        return data;
    }

    async paginate<T>(route: string, queryParams: QueryParams): Promise<Paginator<T>> {
        const params = this.buildQueryParams(queryParams);
        const { data } = await this.client.get<Paginator<T>>(route, { params });
        return data;
    }

    async get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
        return this.client.get<T, R, D>(url, config)
    }

    async post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
        return this.client.post<T, R, D>(url, data, config)
    }

    async put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
        return this.client.put<T, R, D>(url, data, config)
    }

    async delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
        return this.client.delete<T, R, D>(url, config)
    }

    private buildQueryParams(queryParams: QueryParams) {
        const { pagination, search, sort, filter, searchJoin, relations } = queryParams;

        return {
            ...pagination,
            searchJoin,
            filter: filter?.join(','),
            with: relations?.join(','),
            ...this.buildSortQueryParams(sort),
            ...this.buildSearchQueryParams(search),
        };
    }

    private buildSortQueryParams(sort: QueryParams["sort"]) {

        if (typeof sort === "undefined") {
            return {};
        }

        if (sort.constructor === Object) {
            return {
                sortedBy: Object.values(sort).join(";"),
                orderBy: Object.keys(sort).join(";"),
            };
        }

        return { sort };
    }

    private buildSearchQueryParams(search: QueryParams["search"]) {
        if (typeof search === "undefined") {
            return {};
        }

        if (Array.isArray(search)) {
            return {
                search: search.map(({ field, value }) => `${field}:${typeof value === "string" ? value : value.join(",")}`).join(";"),
                searchFields: search.map(({ field, operator }) => `${field}:${operator}`).join(";"),
            };
        }

        return { search };
    }
}
