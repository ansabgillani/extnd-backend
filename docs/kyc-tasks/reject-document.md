# Reject Document REST API

This REST API is being used to reject document

## Reject Document 

`PUT /api/kyc-tasks/reject-document`

### Body
```js
{
    id: String,
    documentId: String,
    rejectionReason: String
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
    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }