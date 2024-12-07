from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
  path('reg/',Register_API.as_view()),
  path('log/',Login_APi.as_view())
]