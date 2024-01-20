import { AxiosInstance } from "axios";

export type ApiClient = AxiosInstance;

export namespace Filter {

    export type SortItem = {
        [column: string]: "asc" | "desc"
    }

    export type Pagination = {
        page: number;
        perPage: number;
    };

    export namespace Search {
        export type Join = "and" | "or";
        export type Item = {
            field: string;
            value: string | string[];
            operator?: "=" | ">" | "<" | ">=" | "<=" | "like" | "ilike" | "in" | "between";
        };
    }
}

export type PaginatorMeta = {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    per_page: number;
};

export type Paginator<T> = {
    data: T[];
    meta: PaginatorMeta;
};

export type QueryParams = {
    pagination?: Filter.Pagination;
    search?: Filter.Search.Item[] | string;
    searchJoin?: Filter.Search.Join;
    sort?: Filter.SortItem;
    relations?: string[];
    filter?: string[];
};
