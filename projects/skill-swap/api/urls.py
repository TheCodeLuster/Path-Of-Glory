#urls.py
from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('user/<int:id>/', get_user),
    path('create_user/', create_user),
    path('userprofile/', UserProfileView.as_view()),
    path('userprofile/<int:id>/', UserProfileView.as_view()),
    path('check_user/', check_user),
    path('login/<str:email>/', check_login),
    path('logout/', logout),
    # JWT endpoints
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

