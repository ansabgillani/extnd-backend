# Pay Installment REST API

This REST API is being used to approve installment

## Pay Installment  

`PUT /api/orders/installments/pay`

### Body
```js
{
   orderId: String,
   bankName: String, 
   paymentSlip: String,
   IBAN: String,
   amountPaid: String, 
   transactionId: String
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