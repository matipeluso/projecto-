from rest_framework import viewsets
from core.models import EstrategiaApoyo
from core.serializers.estrategia import EstrategiaApoyoSerializer

class EstrategiaApoyoViewSet(viewsets.ModelViewSet):
    queryset = EstrategiaApoyo.objects.all()
    serializer_class = EstrategiaApoyoSerializer
