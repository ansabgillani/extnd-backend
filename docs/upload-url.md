# Image Upload REST API

This REST API is being used to upload image on aws3 bucket

## Image Upload

### Request

`POST /api/upload-url`

### Body
```js
{
    file: Object
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
    Response Body: { success: true, post }

#### Fail
    Status: 400
    Response Body: { success: false, error }

    Status: 500
    Response Body: { success: false, error }

