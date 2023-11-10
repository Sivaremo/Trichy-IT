from .models import CustomUser, AdminProfile
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class Register_Serializers(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def validate(self, data):
        password = data.get('password')
        password2 = data.get('password2')

        if password != password2:
            raise serializers.ValidationError("Passwords do not match")

        return data

    def validate_email(self, email):
        if AdminProfile.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email is already registered.")
        return email

    def create(self, validated_data):
        name = validated_data.get('name')
        email = validated_data.get('email')
        password = validated_data.get('password')

        user = CustomUser(username=name, email=email, is_admin=True)
        user.set_password(password)
        user.save()

        user_profile = AdminProfile.objects.create(user=user, name=name, password=user.password, email=email).save()
        return user_profile
