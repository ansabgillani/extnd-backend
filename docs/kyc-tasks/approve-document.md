# Approve Document REST API

This REST API is being used to approve document

## Approve Document 

`PUT /api/kyc-tasks/approve-document`

### Body
```js
{
    id: String,
    documentId: String
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