from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('pets/', Pets_API.as_view(),name='Pets'),
    path('bulkimport/',Bulkimport.as_view(),name='Bulkimport')
]