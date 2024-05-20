# Login REST API

This REST API is being used to login merchant

## Merchant Login

### Request

`POST /api/auth/login/merchant`

### Body
```js
{
    email: String,
    password: String
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
    Response Body: { success: true, token, role, name }

#### Fail
    Status: 422
    Response Body: { success: false, error }


    Status: 400
    Response Body: { success: false, error }


    Status: 500
    Response Body: { success: false, error }
