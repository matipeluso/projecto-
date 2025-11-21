from rest_framework import viewsets
from core.models import Subsector
from core.serializers.subsector import SubsectorSerializer

class SubsectorViewSet(viewsets.ModelViewSet):
    queryset = Subsector.objects.all()
    serializer_class = SubsectorSerializer
