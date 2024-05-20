# Support Assign Customers REST API

This REST API is being used to get assigned customers against current logged in support.

## Support Assign

### Request

`GET /api/customers/assign-to-support`

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
    Response Body: { success: true, totalCount, items }

#### Fail
    Status :401
    Response Body: { success: false, error:Unauthorized }

    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }

