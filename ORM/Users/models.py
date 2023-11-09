from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

# Create your models here.

class CustomUser(AbstractUser):
    password2=models.CharField(null=True,blank=True,max_length=1000)
    is_admin = models.BooleanField(default=False)
    
    def __str__(self):
        return self.username  


class AdminProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    admin_user = models.OneToOneField(CustomUser, related_name='admin_profile', on_delete=models.CASCADE, null=True, blank=True)
    phone_number = models.IntegerField(null=True, blank=True)
    name=models.CharField(null=True, blank=True, max_length=1000)
    email = models.EmailField(null=True, blank=True)
    otp=models.IntegerField(null=True,blank=True)
    password = models.CharField(null=True, blank=True, max_length=1000)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return str(self.admin_user) 