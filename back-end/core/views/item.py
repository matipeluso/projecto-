from rest_framework import viewsets
from core.models import SubdimensionItem
from core.serializers.item import SubdimensionItemSerializer

class SubdimensionItemViewSet(viewsets.ModelViewSet):
    queryset = SubdimensionItem.objects.all()
    serializer_class = SubdimensionItemSerializer
