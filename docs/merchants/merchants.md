# Merchants REST API

This REST API is being used to get and create merchants

## Merchants

### Request

`GET /api/merchants`

### Params
```js
{
     sort: String,
     order: String,
     limit:Number,
     currentPage:Number
    
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
    Response Body: { success: true, totalCount, items}

#### Fail
    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }

### Request

`POST /api/merchants`

### Body
```js
{
    name: String,
    gender: String,
    email: String,
    mobileNo: String,
    image: String
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
    Response Body: { success: true, merchant }

#### Fail
    Status: 422
    Response Body: { success: false, error }

    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }

