# Upload Document REST API

This REST API is being used to upload document against current logged user

## Upload Document 

`PUT /api/customers/upload-document`

### Body
```js
{
    image: String,
    type: String
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
    Response Body: { success: true, customer }

#### Fail
    Status :401
    Response Body: { success: false, error:Unauthorized }

    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }