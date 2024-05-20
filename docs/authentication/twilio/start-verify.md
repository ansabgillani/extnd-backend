# Start Verify REST API

This REST API is being used to generate OTP against a mobile number from Twilio Verify

## Request

`POST /api/auth/start-verify`

## Body
```js
{
    to: String,
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
