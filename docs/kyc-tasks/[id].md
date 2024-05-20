
# KYC Customer REST API

This REST API is being used to KYC customer

## KYC Customer

### Request

`GET /api/kyc-tasks/:id`

### Params
```js
{
    id: String
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


This REST API is being used to KYC customer to set eligibility true
### Request
`PUT /api/kyc-tasks/:id`

### Params
```js
{
    id: String
    
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
    Response Body: { success: true, customer}

#### Fail
    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }