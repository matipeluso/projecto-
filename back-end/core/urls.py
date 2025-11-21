from .views import EvaluacionPsicopedagogicaViewSet, SubdimensionItemViewSet, SubsectorViewSet, EstrategiaApoyoViewSet, ApoyoAdicionalViewSet
from .views import AntecedenteSaludViewSet

from rest_framework import routers
from django.urls import path
from .views import (
    UsuarioViewSet, EspecialidadViewSet, CursoViewSet, ApoderadoViewSet, EstudianteViewSet, AnamnesisViewSet, EvaluacionPsicopedagogicaViewSet,
    EvaluacionSaludViewSet, InformeFamiliaViewSet, EstablecimientoViewSet,
    RegistroPIEViewSet, EquipoAulaViewSet, PlanificacionPIEViewSet,
    TrabajoColaborativoViewSet, ActividadComunidadViewSet, LogroAprendizajeViewSet,
    EvaluacionPIEViewSet,SubdimensionAreaViewSet, TrayectoriaEscolarViewSet,
    SituacionEscolarViewSet, ObservacionEscolarViewSet, ObservacionItemViewSet,
    AntecedenteSaludViewSet,
    password_reset_request, password_reset_verify, password_reset_confirm,
    generar_registro_pie_pdf  # 👈 importante agregar esta vista
)

# ==============================================================
#  Router principal para las APIs REST
# ==============================================================
router = routers.DefaultRouter()
router.register('usuarios', UsuarioViewSet)
router.register('especialidades', EspecialidadViewSet)
router.register('cursos', CursoViewSet)
router.register('apoderados', ApoderadoViewSet)
router.register('estudiantes', EstudianteViewSet)
router.register('anamnesis', AnamnesisViewSet)
router.register('evaluaciones-psicopedagogicas', EvaluacionPsicopedagogicaViewSet)
router.register('evaluaciones-salud', EvaluacionSaludViewSet)
router.register('informes-familia', InformeFamiliaViewSet)
router.register('establecimientos', EstablecimientoViewSet)

# ==== Nuevas tablas del Registro PIE ====
router.register('registros-pie', RegistroPIEViewSet)
router.register('equipo-aula', EquipoAulaViewSet)
router.register('planificaciones-pie', PlanificacionPIEViewSet)
router.register('trabajos-colaborativos', TrabajoColaborativoViewSet)
router.register('actividades-comunidad', ActividadComunidadViewSet)
router.register('logros-aprendizaje', LogroAprendizajeViewSet)
router.register('evaluaciones-pie', EvaluacionPIEViewSet)
router.register('salud', AntecedenteSaludViewSet, basename='salud')

router.register(r'subdimension-areas', SubdimensionAreaViewSet)
router.register(r'trayectorias', TrayectoriaEscolarViewSet)
router.register(r'situaciones-escolares', SituacionEscolarViewSet)
router.register(r'observaciones-escolares', ObservacionEscolarViewSet)
router.register(r'observacion-items', ObservacionItemViewSet)

router.register(r'psico/evaluaciones', EvaluacionPsicopedagogicaViewSet, basename='psico-evaluaciones')
router.register(r'psico/items', SubdimensionItemViewSet, basename='psico-items')
router.register(r'psico/subsectores', SubsectorViewSet, basename='psico-subsectores')
router.register(r'psico/estrategias', EstrategiaApoyoViewSet, basename='psico-estrategias')
router.register(r'psico/apoyos', ApoyoAdicionalViewSet, basename='psico-apoyos')

# ==============================================================
#  URLs adicionales (no gestionadas por router)
# ==============================================================
urlpatterns = router.urls + [
    # 🔐 Rutas para restablecimiento de contraseña
    path('password-reset/request/', password_reset_request),
    path('password-reset/verify/', password_reset_verify),
    path('password-reset/confirm/', password_reset_confirm),

    # 📄 Ruta para generar el PDF del Registro PIE
    path('registros-pie/<int:registro_id>/pdf/', generar_registro_pie_pdf),
]
