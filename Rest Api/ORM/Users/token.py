import jwt

SECRET_KEY = 'your-secret-key'

def decode_refresh_token(refresh_token):
    try:
        payload = jwt.decode(refresh_token, algorithms=['HS256'])
        print(payload)
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

