from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import Pets
from .serializers import *

# Create your views here.
class Pets_API(APIView):
    def post(self,request):
        serializers=Pets_serializers(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({'message':'Created SucessFully'},status=status.HTTP_201_CREATED)
        return Response(serializers.errors,status=status.HTTP_500_INTERNAL_SERVER_ERROR)