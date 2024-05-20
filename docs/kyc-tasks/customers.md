
# KYC Customers REST API

This REST API is being used to get KYC customers

## KYC Customers

### Request

`GET /api/kyc-tasks`

### Params
```js
{
     sort: String,
     order: String,
     limit:Number,
     currentPage:Number
    
}
```

### Body
```js
{}
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