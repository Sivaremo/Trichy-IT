from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('petsdata/',include('Pets.urls')),
    path('users/',include('Users.urls'))
]
