from rest_framework import serializers
from core.models import EvaluacionPsicopedagogica
from .item import SubdimensionItemSerializer
from .subsector import SubsectorSerializer
from .estrategia import EstrategiaApoyoSerializer
from .apoyo import ApoyoAdicionalSerializer

class EvaluacionPsicopedagogicaSerializer(serializers.ModelSerializer):
    items = SubdimensionItemSerializer(many=True, read_only=True)
    subsectores = SubsectorSerializer(many=True, read_only=True)
    estrategias_apoyo = EstrategiaApoyoSerializer(many=True, read_only=True)
    apoyos_adicionales = ApoyoAdicionalSerializer(many=True, read_only=True)

    class Meta:
        model = EvaluacionPsicopedagogica
        fields = '__all__'

    def create(self, validated_data):
        subsectores_data = validated_data.pop("subsectores", [])
        evaluacion = EvaluacionPsicopedagogica.objects.create(**validated_data)
        for s in subsectores_data:
            Subsector.objects.create(evaluacion=evaluacion, **s)
        return evaluacion
