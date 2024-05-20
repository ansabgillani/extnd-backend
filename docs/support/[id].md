# Support REST API

This REST API is being used to get and update support

## Support 

### Request

`GET /api/supports/:id`

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
    "Authorization": "Bearer <jwt token>",

}
```

### Response

##### Success
    Status: 200
    Response Body: { success: true, merchant}

#### Fail
    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }

### Request

`PUT /api/supports/:id`

### Params
```js
{
    id: String
}
```

### Body
```js
{
    name: String,
    gender: String,
    email: String,
    mobileNo: String,
    image: String
    DOB: String
}
```

### Headers 
```js
headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <jwt token>",

}
```

### Response

##### Success
    Status: 200
    Response Body: { success: true, support }

#### Fail
    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }

### Request

`DELETE /api/supports/:id`

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
    Response Body: { success: true, support }

#### Fail
    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }