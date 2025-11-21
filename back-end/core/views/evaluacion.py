from rest_framework import viewsets
from core.models import EvaluacionPsicopedagogica
from core.serializers.evaluacion import EvaluacionPsicopedagogicaSerializer

class EvaluacionPsicopedagogicaViewSet(viewsets.ModelViewSet):
    queryset = EvaluacionPsicopedagogica.objects.all()
    serializer_class = EvaluacionPsicopedagogicaSerializer
