# Approve Transaction REST API

This REST API is being used to approve transaction

## Approve Transaction  

`PUT /api/orders/transactions/approve`

### Body
```js
{
  orderId: String, 
  transactionId : String
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
    Response Body: { success: true, order }

#### Fail
    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }