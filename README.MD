## Usage
```ts
import { L5Client } from "l5-client";

const api = new L5Client('http://localhost:8000/api')

interface User {
    name: string;
    email: string;
    created_at: string;
}

api.paginate<User>('users', {
    pagination: {page: 1, perPage: 20},
    filter: ["name", "email", "created_at"],
    sort: {
        name: "asc",
        created_at: "desc"
    },
    search: [
        {field: 'name', operator: 'like', value: 'JalalLinuX'},
        {field: 'post.title', operator: 'like', value: 'instagram'},
        {field: 'post.likes_count', operator: '>', value: '1000'},
    ]
})
```

## Methods
```ts
api.paginate(route: string, queryParams: QueryParams)

api.get(url: string, config?: AxiosRequestConfig<D>)

api.post(url: string, data?: D, config?: AxiosRequestConfig<D>)

api.put(url: string, data?: D, config?: AxiosRequestConfig<D>)

api.delete(url: string, config?: AxiosRequestConfig<D>)
```