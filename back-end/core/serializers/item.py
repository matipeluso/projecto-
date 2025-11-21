from rest_framework import serializers
from core.models import SubdimensionItem

class SubdimensionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubdimensionItem
        fields = '__all__'
