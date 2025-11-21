from rest_framework import serializers
from core.models import Subsector

class SubsectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subsector
        fields = ["id", "subsector", "tipo"]
