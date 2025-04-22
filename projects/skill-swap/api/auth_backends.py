# api/auth_backends.py
from django.contrib.auth.backends import ModelBackend
from .models import User

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        print(f'Authenticating with email: {email}, password: {password}')
        if email is None or password is None:
            print('Email or password missing')
            return None
        try:
            user = User.objects.get(email__iexact=email.lower())
            print(f'User found: {user}')
            if user.check_password(password) and user.is_active:
                print('Authentication successful')
                return user
            else:
                print('Password incorrect or user is not active')
                return None
        except User.DoesNotExist:
            print('User does not exist')
            return None
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None