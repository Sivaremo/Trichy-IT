from .models import CustomUser, AdminProfile
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class Register_Serializers(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

class Login_Serializers(serializers.Serializer):
    email=serializers.EmailField()
    password=serializers.CharField(write_only=True)

class User_serializers(serializers.ModelSerializer):
    class Meta:
        model=AdminProfile
        fields='__all__'