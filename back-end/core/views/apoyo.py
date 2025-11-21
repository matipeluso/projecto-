from rest_framework import viewsets
from core.models import ApoyoAdicional
from core.serializers.apoyo import ApoyoAdicionalSerializer

class ApoyoAdicionalViewSet(viewsets.ModelViewSet):
    queryset = ApoyoAdicional.objects.all()
    serializer_class = ApoyoAdicionalSerializer
