from django.urls import path
from .views import *

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('users/<int:id>/', get_user, name='users'),
    path('user/', create_user),
    path('login/<str:email>/', check_login),
]

