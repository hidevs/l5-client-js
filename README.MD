## Usage


```js
const api = new L5Client('http://localhost:8000/api')

api.list('users', {
    pagination: {page: 1, perPage: 20},
    sortedBy: "desc",
    search: [
        {field: 'post.title', operator: 'like', value: 'today'},
        {field: 'post.likes_count', operator: '>', value: '1000'},
    ]
})
```