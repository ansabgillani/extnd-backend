export const MERCHANTS_CATEGORY = ['CATEGORY_A', 'CATEGORY_B'];
export const ORDER_LOWER_LIMIT = 500;
export const CURRENT_MERCHANT = 'CATEGORY_B';
export const ORDER_UPPER_LIMIT = 650;

export const DOCUMENT_REJECTION_REASONS = [
    'Reason 1',
    'Reason 2'
]

export const TRANSACTION_REJECTION_REASONS = [
    'Invalid Payment Slip',
    'Invalid IBAN',
    'Invalid Bank Name',
]

export const TOTAL_KYC_POINTS = {
    MIN: 10,
    MAX: 110
}

export const ORDER_BODY = {
    "order": {
        "id": 450789469,
        "contact_email": "musaghauri@hotmail.com",
        "billing_address": {
            "first_name": "Muhammad",
            "address1": "Chestnut Street 92",
            "phone": "3359422293",
            "city": "Lahore",
            "zip": "54000",
            "province": "Punjab",
            "country": "Pakistan",
            "last_name": "Musa",
            "address2": "",
            "company": null,
            "latitude": 45.41634,
            "longitude": -75.6868,
            "name": "Muhammad Musa",
            "country_code": "PK",
            "province_code": "PJ"
        },
        "customer": {
            "id": 207119551,
            "email": "bob.norman@hostmail.com",
            "accepts_marketing": false,
            "created_at": "2021-12-16T16:18:58-05:00",
            "updated_at": "2021-12-16T16:18:58-05:00",
            "first_name": "Bob",
            "last_name": "Norman",
            "orders_count": 1,
            "state": "disabled",
            "total_spent": "199.65",
            "last_order_id": 450789469,
            "note": null,
            "verified_email": true,
            "multipass_identifier": null,
            "tax_exempt": false,
            "phone": "+16136120707",
            "tags": "",
            "last_order_name": "#1001",
            "currency": "USD",
            "accepts_marketing_updated_at": "2005-06-12T11:57:11-04:00",
            "marketing_opt_in_level": null,
            "tax_exemptions": [],
            "sms_marketing_consent": null,
            "admin_graphql_api_id": "gid://shopify/Customer/207119551",
            "default_address": {
                "id": 207119551,
                "customer_id": 207119551,
                "first_name": null,
                "last_name": null,
                "company": null,
                "address1": "Chestnut Street 92",
                "address2": "",
                "city": "Louisville",
                "province": "Kentucky",
                "country": "United States",
                "zip": "40202",
                "phone": "555-625-1199",
                "name": "",
                "province_code": "KY",
                "country_code": "US",
                "country_name": "United States",
                "default": true
            }
        },
        "total_price_usd": "655",
        "line_items": [
            {
                "name": "IPod Nano - 8gb - green",
                "price": "199.00",
                "id": 466157049,
                "product_id": 632910392,
                "quantity": 1,
                "title": "IPod Nano - 8gb"
            },
            {
                "id": 518995019,
                "name": "IPod Nano - 8gb - red",
                "price": "199.00",
                "quantity": 1,
                "title": "IPod Nano - 8gb",
                "product_id": 632910392
            },
            {
                "id": 703073504,
                "name": "IPod Nano - 8gb - black",
                "price": "199.00",
                "product_id": 632910392,
                "quantity": 1,
                "title": "IPod Nano - 8gb"
            }
        ],
        "merchant": "Daraz"
    }
}

