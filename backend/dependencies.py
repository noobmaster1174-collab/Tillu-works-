import os
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from google.oauth2 import id_token
from google.auth.transport import requests

# Load environment variables
load_dotenv()

security = HTTPBearer()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
OWNER_EMAIL = os.getenv("OWNER_EMAIL")

def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Verifies the Google token passed in the Authorization header.
    Throws a 401 if invalid.
    Throws a 403 if the user is not the configured OWNER_EMAIL.
    """
    token = credentials.credentials
    
    try:
        # Verify the token with Google
        id_info = id_token.verify_oauth2_token(
            token, requests.Request(), GOOGLE_CLIENT_ID
        )

        user_email = id_info.get("email")

        # Check against pure admin list
        if not user_email or user_email.lower() != OWNER_EMAIL.lower():
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to access the admin portal.",
            )

        # Return token info for the route to use if needed
        return id_info
        
    except ValueError:
        # Invalid token
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
