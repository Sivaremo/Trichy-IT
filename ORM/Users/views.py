from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password, check_password

class Register_API(APIView):
    def post(self, request):
        serializer = Register_Serializers(data=request.data)
        
        if serializer.is_valid():
            name = serializer.validated_data.get('name')
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            password2 = serializer.validated_data.get('password2')
            
            if password != password2:
                return Response({'message': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

            if AdminProfile.objects.filter(email=email).exists():
                return Response({'message': 'Account already exists'}, status=status.HTTP_400_BAD_REQUEST)

            password_make = make_password(password)
            
         
            user = CustomUser(username=name, email=email, is_admin=True)
            user.set_password(password_make)

            try:
                user.save()
             
                AdminProfile.objects.create(admin_user=user, name=name, is_active=True, email=email, password=password_make)

                return Response({'message': 'Account created successfully'}, status=status.HTTP_201_CREATED)

            except Exception as e:
                return Response({'message': 'Username or email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class Login_APi(APIView):
    def post(self,request):
        serializer = Login_Serializers(data=request.data)
     
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            admin= AdminProfile.objects.filter(email=email).first()
            if not admin:
                return Response({'message':'Register Your Account First'},status=status.HTTP_401_UNAUTHORIZED)
            password1=admin.password
            if not check_password(password,password1):
                return Response({'message':'password invaild'},status=status.HTTP_401_UNAUTHORIZED)
            token= RefreshToken.for_user(admin)
            user_data= {
                'message':'login Sucessfully',
                'refresh': str(token),
                'access': str(token.access_token),
                'user':token.payload['user_id']
            }
            request.session['user']=user_data['refresh']
            response=Response()
            response.data=user_data
            response.status_code=status.HTTP_200_OK

            return response
        return Response(serializer.errors,status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def get(self,request):
        user=request.session.get('user')
        if user:
            token=RefreshToken(user)
            user_id=token.payload['user_id']
            user=AdminProfile.objects.filter(id=user_id).first()
            userdetails=User_serializers(user)

            return Response({'message':'user logined','id':user_id,'data': userdetails.data},status=status.HTTP_200_OK)
        return Response({'message':'Login '},status=status.HTTP_404_NOT_FOUND)
    
    def delete(self,request):
        response=Response()
        if request.session.get('user'):
            request.session.flush()
            response.data={'message':'Logout Successfully'}
            response.status_code=status.HTTP_200_OK
            return response
        return Response({'message':'User is not login'},status=status.HTTP_400_BAD_REQUEST)
        