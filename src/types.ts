import { AxiosInstance } from "axios";

export type ApiClient = AxiosInstance;

export type FilterSortItem = {
    [column: string]: "asc" | "desc"
}

export type FilterPagination = {
    page: number;
    perPage: number;
};

export type FilterSearchJoin = "and" | "or";

export type FilterSearchItem = {
    field: string;
    value: string | string[];
    operator?: "=" | ">" | "<" | ">=" | "<=" | "like" | "ilike" | "in" | "between";
};

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
    pagination?: FilterPagination;
    search?: FilterSearchItem[] | string;
    searchJoin?: FilterSearchJoin;
    sort?: FilterSortItem;
    relations?: string[];
    filter?: string[];
};
