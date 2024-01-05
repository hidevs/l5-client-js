export namespace Filter {
    export enum QueryParamKeys {
        Page = "page",
        PerPage = "perPage",
        OrderBy = "orderBy",
        OrderDir = "orderType",
        Search = "search",
        SearchFields = "searchFields",
    }

    export enum OrderDirection {
        Ascending = "asc",
        Descending = "desc",
    }
}

export type Paginator<T> = {
    data: T[];
    meta: {
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
        per_page: number;
    };
};
