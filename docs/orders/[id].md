# Order REST API

This REST API is being used to get and update order

## Oder

### Request

`GET /api/orders/:id`

### Params
```js
{
    id: String
}
```

### Headers 
```js
headers: {
    "Content-Type": "application/json",
}
```

### Response

##### Success
    Status: 200
    Response Body: { success: true, order}

#### Fail
    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }

### Request

`PUT /api/orders/:id`

### Params
```js
{
    id: String
}
```

### Body
```js
{
    supportAssistant: String
}
```

### Headers 
```js
headers: {
    "Content-Type": "application/json",
}
```

### Response

##### Success
    Status: 200
    Response Body: { success: true, customer}

#### Fail
    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }
