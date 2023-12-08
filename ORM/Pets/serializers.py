from .models import Pets
from rest_framework import serializers

class Pets_serializers(serializers.ModelSerializer):
    class Meta:
        model=Pets
        fields=['BreedName', 'PetName', 'price', 'No_of_pets', 'No_of_pets_sold']





class Data_serializers(serializers.ModelSerializer):
    class Meta:
        model=Pets
        fields='__all__'

class Bulkimport_serializers(serializers.Serializer):
    files=serializers.FileField(required=True)