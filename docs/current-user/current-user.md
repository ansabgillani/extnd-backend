# Current User REST API

This REST API is being used to get current user

## Current User

### Request

`GET /api/current-user`

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
    Response Body: { success: true, user }

#### Fail
    Status :401
    Response Body: { success: false, error:Unauthorized }

    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }


