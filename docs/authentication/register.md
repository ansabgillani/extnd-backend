# Register REST API

This REST API is being used to register a customer

## Request

`POST /api/auth/register`

## Body
```js
{
    
    firstName: String,
    lastName: String,
    gender: String,
    email: String,
    password: String,
    mobileNo: String,
    DOB: String,
    CNIC: String,
    maritalStatus: String,
}
```

## Headers 
```js
headers: {
    "Content-Type": "application/json",
}
```

## Response

### Success
    Status: 201
    Response Body: { success: true, customer }

### Fail
    Status: 400
    Response Body: { success: false, error }
