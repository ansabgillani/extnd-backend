# Check Verify REST API

This REST API is being used to validate the OTP from Twilio Verify

## Request

`POST /api/auth/check-verify`

## Body
```js
{
    to: String,
    code: String
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
    Status: 200
    Response Body: { success: true, data }

### Fail
    Status: 400
    Response Body: { success: false, error }
