# Edit Transaction REST API

This REST API is being used to edit transaction 

## Edit Transaction  

`PUT /api/orders/transactions/edit`

### Body
```js
{
  orderId: String,
  transactionId: String,
  data: Object,
  setInvalid: String
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
    Response Body: { success: true, transaction}

#### Fail
    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }