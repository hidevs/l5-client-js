## Usage


```js
const api = new L5Client('http://localhost:8000/api')

api.list('users', {
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