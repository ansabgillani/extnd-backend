# Supports REST API

This REST API is being used to get and create supports

## Supports

### Request

`GET /api/orders/supports/list`

### Params
```js
{
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
    Response Body: { success: true, supports}

#### Fail
    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }
