from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('users/<int:id>/', get_user, name='users'),
    path('user/', create_user),
    path('check/', check_user),
    path('login/<str:email>/', check_login),
    path('userprofile/', personal_info),
    # JWT endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

