import { ApiClient, QueryParams, Paginator } from "./types";
import axios from "axios";

export default class L5Client {
    private client: ApiClient;
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl.replace(/^\/?|\/?$/g, "");
        this.client = axios.create({ baseURL: this.baseUrl });
    }

    async list<T>(route: string, queryParams: QueryParams) {
        const params = this.buildQueryParams(queryParams);
        const { data } = await this.client.get<Paginator<T>>(route, { params });
        return data;
    }

    private buildQueryParams(queryParams: QueryParams) {
        const { pagination, search } = queryParams;

        return {
            ...pagination,
            ...this.buildSearchQueryParams(search),
        };
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
