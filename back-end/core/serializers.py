
from rest_framework import serializers
from .models import *

# ================================================================
# 1. SERIALIZADORES BASE
# ================================================================

class EstablecimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establecimiento
        fields = '__all__'

class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad
        fields = '__all__'


class UsuarioSerializer(serializers.ModelSerializer):
    especialidad = EspecialidadSerializer(read_only=True)
    especialidad_id = serializers.PrimaryKeyRelatedField(
        source='especialidad', queryset=Especialidad.objects.all(), write_only=True, required=False
    )

    class Meta:
        model = Usuario
        fields = '__all__'


class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'


class ApoderadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apoderado
        fields = '__all__'


class EstudianteSerializer(serializers.ModelSerializer):
    curso = CursoSerializer(read_only=True)
    curso_id = serializers.PrimaryKeyRelatedField(
        source='curso', queryset=Curso.objects.all(), write_only=True, required=False
    )
    apoderado = ApoderadoSerializer(read_only=True)
    apoderado_id = serializers.PrimaryKeyRelatedField(
        source='apoderado', queryset=Apoderado.objects.all(), write_only=True, required=False
    )

    class Meta:
        model = Estudiante
        fields = '__all__'


# ================================================================
# 3. ANAMNESIS
# ================================================================

class InformanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Informante
        fields = '__all__'

class EntrevistadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrevistador
        fields = '__all__'

class AntecedenteSaludSerializer(serializers.ModelSerializer):
    class Meta:
        model = AntecedenteSalud
        fields = '__all__'

    def validate(self, data):
        if data.get('peso') is not None and data['peso'] <= 0:
            raise serializers.ValidationError("El peso debe ser positivo.")
        if data.get('talla') is not None and data['talla'] <= 0:
            raise serializers.ValidationError("La talla debe ser positiva.")
        return data

class AnamnesisSerializer(serializers.ModelSerializer):
    informantes = InformanteSerializer(many=True, read_only=True)
    entrevistadores = EntrevistadorSerializer(many=True, read_only=True)
    antecedentes_salud = AntecedenteSaludSerializer(many=True, read_only=True)

    class Meta:
        model = Anamnesis
        fields = '__all__'

# ================================================================
# 4. EVALUACIÓN PSICOPEDAGÓGICA
# ================================================================

class SubdimensionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubdimensionItem
        fields = '__all__'

class SubsectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subsector
        fields = ["id", "subsector", "tipo"]


class EstrategiaApoyoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstrategiaApoyo
        fields = '__all__'

class ApoyoAdicionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApoyoAdicional
        fields = '__all__'

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
# ================================================================
# 5. EVALUACIÓN DE SALUD
# ================================================================

class EvaluacionSaludSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluacionSalud
        fields = '__all__'

# ================================================================
# 6. INFORME PARA LA FAMILIA
# ================================================================

class InformeFamiliaInstrumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformeFamiliaInstrumento
        fields = '__all__'

class InformeFamiliaAmbitoSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformeFamiliaAmbito
        fields = '__all__'

class InformeFamiliaSeguimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformeFamiliaSeguimiento
        fields = '__all__'

class InformeFamiliaEntregaSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformeFamiliaEntrega
        fields = '__all__'

class InformeFamiliaReceptorSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformeFamiliaReceptor
        fields = '__all__'

class InformeFamiliaSerializer(serializers.ModelSerializer):
    instrumentos = InformeFamiliaInstrumentoSerializer(many=True, read_only=True)
    ambitos = InformeFamiliaAmbitoSerializer(many=True, read_only=True)
    seguimientos = InformeFamiliaSeguimientoSerializer(many=True, read_only=True)
    entrega = InformeFamiliaEntregaSerializer(many=True, read_only=True)
    receptores = InformeFamiliaReceptorSerializer(many=True, read_only=True)

    class Meta:
        model = InformeFamilia
        fields = '__all__'




# ================================================================
# SERIALIZERS – REGISTRO PIE
# ================================================================

class EquipoAulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipoAula
        fields = '__all__'


class PlanificacionPIESerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanificacionPIE
        fields = '__all__'


class TrabajoColaborativoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrabajoColaborativo
        fields = '__all__'


class ActividadComunidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActividadComunidad
        fields = '__all__'


class LogroAprendizajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogroAprendizaje
        fields = '__all__'


class EvaluacionPIESerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluacionPIE
        fields = '__all__'


class RegistroPIESerializer(serializers.ModelSerializer):
    """
    Incluye los subcomponentes (equipo, planificación, logros, etc.)
    para mostrar todo el registro completo.
    """
    equipo_aula = EquipoAulaSerializer(many=True, read_only=True)
    trabajos_colaborativos = TrabajoColaborativoSerializer(many=True, read_only=True)
    actividades_comunidad = ActividadComunidadSerializer(many=True, read_only=True)
    logros = LogroAprendizajeSerializer(many=True, read_only=True)
    planificacion = PlanificacionPIESerializer(read_only=True)
    evaluacion = EvaluacionPIESerializer(read_only=True)

    class Meta:
        model = RegistroPIE
        fields = '__all__'



class SubdimensionAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubdimensionArea
        fields = '__all__'




class TrayectoriaEscolarSerializer(serializers.ModelSerializer):
    estudiante = EstudianteSerializer(read_only=True)
    estudiante_id = serializers.PrimaryKeyRelatedField(
        source='estudiante',
        queryset=Estudiante.objects.all(),
        write_only=True
    )

    class Meta:
        model = TrayectoriaEscolar
        fields = '__all__'


class SituacionEscolarSerializer(serializers.ModelSerializer):
    estudiante = EstudianteSerializer(read_only=True)
    estudiante_id = serializers.PrimaryKeyRelatedField(
        source='estudiante',
        queryset=Estudiante.objects.all(),
        write_only=True
    )

    class Meta:
        model = SituacionEscolar
        fields = '__all__'



class ObservacionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObservacionItem
        fields = '__all__'


class ObservacionEscolarSerializer(serializers.ModelSerializer):
    items = ObservacionItemSerializer(many=True, read_only=True)

    evaluacion = EvaluacionPsicopedagogicaSerializer(read_only=True)
    evaluacion_id = serializers.PrimaryKeyRelatedField(
        source='evaluacion',
        queryset=EvaluacionPsicopedagogica.objects.all(),
        write_only=True
    )

    class Meta:
        model = ObservacionEscolar
        fields = '__all__'



class SubdimensionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubdimensionItem
        fields = '__all__'

class SubsectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subsector
        fields = '__all__'

class EstrategiaApoyoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstrategiaApoyo
        fields = '__all__'

class ApoyoAdicionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApoyoAdicional
        fields = '__all__'

class EvaluacionPsicopedagogicaSerializer(serializers.ModelSerializer):
    items = SubdimensionItemSerializer(many=True)
    subsectores = SubsectorSerializer(many=True)
    estrategias_apoyo = EstrategiaApoyoSerializer(many=True)
    apoyos_adicionales = ApoyoAdicionalSerializer(many=True)
    estudiante = serializers.PrimaryKeyRelatedField(queryset=Estudiante.objects.all())

    class Meta:
        model = EvaluacionPsicopedagogica
        fields = [
            'id', 'estudiante', 'evaluador', 'fecha', 'observaciones',
            'items', 'subsectores', 'estrategias_apoyo', 'apoyos_adicionales'
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        subsectores_data = validated_data.pop('subsectores')
        estrategias_data = validated_data.pop('estrategias_apoyo')
        apoyos_data = validated_data.pop('apoyos_adicionales')
        evaluacion = EvaluacionPsicopedagogica.objects.create(**validated_data)
        for item in items_data:
            SubdimensionItem.objects.create(evaluacion=evaluacion, **item)
        for sub in subsectores_data:
            Subsector.objects.create(evaluacion=evaluacion, **sub)
        for est in estrategias_data:
            EstrategiaApoyo.objects.create(evaluacion=evaluacion, **est)
        for ap in apoyos_data:
            ApoyoAdicional.objects.create(evaluacion=evaluacion, **ap)
        return evaluacion

    def update(self, instance, validated_data):
        items_data = validated_data.pop('items')
        subsectores_data = validated_data.pop('subsectores')
        estrategias_data = validated_data.pop('estrategias_apoyo')
        apoyos_data = validated_data.pop('apoyos_adicionales')

        instance.evaluador = validated_data.get('evaluador', instance.evaluador)
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estudiante = validated_data.get('estudiante', instance.estudiante)
        instance.save()

        instance.items.all().delete()
        for item in items_data:
            SubdimensionItem.objects.create(evaluacion=instance, **item)
        instance.subsectores.all().delete()
        for sub in subsectores_data:
            Subsector.objects.create(evaluacion=instance, **sub)
        instance.estrategias_apoyo.all().delete()
        for est in estrategias_data:
            EstrategiaApoyo.objects.create(evaluacion=instance, **est)
        instance.apoyos_adicionales.all().delete()
        for ap in apoyos_data:
            ApoyoAdicional.objects.create(evaluacion=instance, **ap)
        return instance