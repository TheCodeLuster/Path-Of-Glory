from django.urls import path
from .views import *
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world!")

urlpatterns = [
    path('', index),
]
