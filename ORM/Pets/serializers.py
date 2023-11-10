from .models import Pets
from rest_framework import serializers

class Pets_serializers(serializers.ModelSerializer):
    class Meta:
        model=Pets
        fields='__all__'