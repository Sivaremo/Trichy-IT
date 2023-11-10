from django.shortcuts import render
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.contrib.auth.hashers import make_password,check_password

# Create your views here.
class Register_API(APIView):
    def post(self,request):
        serializer=Register_Serializers(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password=serializer.validated_data.get('password')
            password1=serializer.validated_data.get('password2')
            if password != password1:
                return Response({'message':'Password does not match'},status=status.HTTP_400_BAD_REQUEST)
            if AdminProfile.objects.filter(email=email).exists():
                return Response({'message': 'Account already exists'}, status=status.HTTP_400_BAD_REQUEST)
            user = serializer.save()
            return Response({'message': 'Account created successfully', 'user_id': user.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)