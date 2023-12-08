from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import Pets
from .serializers import *
from rest_framework.parsers import FileUploadParser

# Create your views here.
class Pets_API(APIView):
    def post(self,request):
        serializer=Pets_serializers(data=request.data)
        if serializer.is_valid():
            name=serializer.validated_data.get('PetName')
            queryset=Pets.objects.create(**serializer.validated_data)
            queryset.save()
            return Response({'message':f'{name} Created SucessFully'},status=status.HTTP_201_CREATED)
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
            return Response({'message':f'{queryset.PetName} Updated Sucessfullyy'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def delete(self,request):
        id=request.query_params.get('id')
        queryset=Pets.objects.get(id=id)
        queryset.delete()
        return Response({'message':'Deleted Sucessfully'},status=status.HTTP_200_OK)


class Bulkimport(APIView):
    parser_classes = [FileUploadParser]
    def post(self,request):
         file_serializer = Bulkimport_serializers(data=request.data)
         if file_serializer.is_valid():
            uploaded_file = file_serializer.validated_data['file']
            try:
                import pandas as pd
                excel_files = [file for file in uploaded_file if file.endswith('.xlsx') or file.endswith('.xls')]
                for excel_file in excel_files:
                    df = pd.read_excel(uploaded_file)
                    pets_data = df.to_dict(orient='records')
                    pets_serializer = Pets_serializers(data=pets_data, many=True)
                if pets_serializer.is_valid():
                    pets_serializer.save()
                    return Response({'message': 'Data saved successfully'}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'error': pets_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

            except Exception as e:
                return Response({'error': f'Error reading the file: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
         else:
             return Response({'errors':file_serializer.errors},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            