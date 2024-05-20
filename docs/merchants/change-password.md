# Change Password REST API

This REST API is being used to change password

## Change Password

`PUT /api/merchants/change-password`

### Body
```js
{
    merchantId: String
    password: String,
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
    Status :401
    Response Body: { success: false, error:Unauthorized }

    Status :403
    Response Body: { success: false, error:Access Denied }

    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }