# Supports REST API

This REST API is being used to get and create supports

## Supports

### Request

`GET /api/supports`

### Params
```js
{
     sort: String,
     order: String,
     limit:Number,
     currentPage:Number
    
}

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
    Response Body: { success: true, totalCount, items}

#### Fail
    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }

### Request

`POST /api/supports`

### Body
```js
{
    name: String,
    gender: String,
    email: String,
    mobileNo: String,
    image: String,
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
    Status: 422
    Response Body: { success: false, error }

    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }

