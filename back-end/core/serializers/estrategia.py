from rest_framework import serializers
from core.models import EstrategiaApoyo

class EstrategiaApoyoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstrategiaApoyo
        fields = '__all__'
