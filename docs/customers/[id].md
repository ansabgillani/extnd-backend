# Customer Update REST API

This REST API is being used to update customer

## Customer Update

### Request

`PUT /api/customers/:id`

### Params
```js
{
    id: String
}
```

### Body
```js
{
    supportAssistant: String
}
```

### Headers 
```js
headers: {
    "Content-Type": "application/json",
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