from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import Pets
from .serializers import *

# Create your views here.
class Pets_API(APIView):
    def post(self,request):
        serializer=Pets_serializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Created SucessFully'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def get(self,request):
        id=request.query_params.get('id')
        if id:
            queryset=Pets.objects.get(id=id)
            serializer=Data_serializers(queryset)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            queryset=Pets.objects.all()
            serializer=Data_serializers(queryset,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
    def put(self,request):
        id=request.query_params.get('id')
        queryset=Pets.objects.get(id=id)
        serializer=Pets_serializers(queryset,data=request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Updated Sucessfullyy'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def delete(self,request):
        id=request.query_params.get('id')
        queryset=Pets.objects.get(id=id)
        queryset.delete()
        return Response({'message':'Deleted Sucessfully'},status=status.HTTP_200_OK)


