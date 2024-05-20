# Approved Documents REST API

This REST API is being used to get approved documents

## Approved Documents 

### Request

`GET /api/customers/approved-documents`

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
    Response Body: { success: true,  approvedDocs }

#### Fail
    Status :401
    Response Body: { success: false, error:Unauthorized }

    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }
