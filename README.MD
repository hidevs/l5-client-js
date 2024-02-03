## Install
```shell
npm install l5-client

pnpm install l5-client

yarn add l5-client
```

## Usage
```ts
import { L5Client } from 'l5-client';

const api = new L5Client('http://localhost:8000/api')

interface User {
    name: string;
    email: string;
    created_at: string;
}

api.all<User>('users', {
    filter: ['name', 'email', 'created_at'],
    sort: {
        name: 'asc',
        created_at: 'desc'
    },
    relations: ['post'],
    searchJoin: 'and',
    search: [
        {field: 'name', operator: 'like', value: 'JalalLinuX'},
        {field: 'post.title', operator: 'like', value: 'instagram'},
        {field: 'post.likes_count', operator: '>', value: '1000'},
    ]
})

api.paginate<User>('users', {
    pagination: {page: 1, perPage: 20},
    filter: ['name', 'email', 'created_at'],
    sort: {
        name: 'asc',
        created_at: 'desc'
    },
    relations: ['post'],
    searchJoin: 'and',
    search: [
        {field: 'name', operator: 'like', value: 'JalalLinuX'},
        {field: 'post.title', operator: 'like', value: 'instagram'},
        {field: 'post.likes_count', operator: '>', value: '1000'},
    ]
})
```

## Methods
```ts
api.all(route: string, queryParams: Omit<QueryParams, "pagination">): T[]

api.paginate(route: string, queryParams: QueryParams): Paginator<T>

api.get(url: string, config?: AxiosRequestConfig<D>)

api.post(url: string, data?: D, config?: AxiosRequestConfig<D>)

api.put(url: string, data?: D, config?: AxiosRequestConfig<D>)

api.delete(url: string, config?: AxiosRequestConfig<D>)
```