import requests

url = "http://localhost:8000/api/quote"

data = {
    'name': 'Phanindra',
    'email': 'testing@example.com',
    'phone': '1234567890',
    'company': '',
    'requirements': '',
    'products': '["id_card"]',
    'quantities': '{"id_card": 10}',
    'metadata_info': '{"orientation": "vertical"}',
    'total_price': 1500
}

try:
    response = requests.post(url, data=data)
    print("STATUS:", response.status_code)
    print("RESPONSE:", response.text)
except Exception as e:
    print("ERROR:", str(e))
