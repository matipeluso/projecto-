from rest_framework import serializers
from core.models import ApoyoAdicional

class ApoyoAdicionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApoyoAdicional
        fields = '__all__'
