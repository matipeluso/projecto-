from core.models import Establecimiento, Curso, Estudiante, Apoderado, Usuario, Anamnesis
from django.contrib.auth.hashers import make_password

# Crear establecimiento
est, _ = Establecimiento.objects.get_or_create(
    nombre="Colegio Prueba",
    rbd="12345",
    direccion="Calle Falsa 123",
    comuna="Santiago",
    region="Metropolitana",
    telefono="123456789",
    email="colegio@prueba.cl",
    tipo_dependencia="Municipal"
)

# Crear curso
curso, _ = Curso.objects.get_or_create(
    nombre="4° Básico",
    nivel="Básico",
    anio_escolar=2025,
    establecimiento=est
)

# Crear apoderado
apod, _ = Apoderado.objects.get_or_create(
    nombres_apellidos="Juan Apoderado",
    run="11111111-1",
    telefono="987654321",
    correo="apoderado@correo.cl",
    direccion="Calle Apoderado 456",
    parentesco="Padre",
    ocupacion="Empleado",
    escolaridad="Universitaria"
)

# Crear estudiante
estud, _ = Estudiante.objects.get_or_create(
    nombres_apellidos="Pedro Prueba",
    run="22222222-2",
    genero="M",
    fecha_nacimiento="2015-05-10",
    nacionalidad="Chilena",
    lengua_origen="Español",
    lengua_uso="Español",
    curso=curso,
    apoderado=apod,
    establecimiento=est
)

# Crear usuario profesional
prof, _ = Usuario.objects.get_or_create(
    username="profesalud",
    first_name="Ana",
    last_name="Salud",
    email="ana.salud@correo.cl",
    telefono="123123123",
    tipo="Interno",
    password=make_password("test1234")
)

# Crear anamnesis
anam, _ = Anamnesis.objects.get_or_create(
    estudiante=estud,
    fecha="2025-11-21",
    definicion_problema="Problema de salud detectado.",
    observaciones_generales="Sin observaciones."
)

print(f"Establecimiento: {est.id}, Curso: {curso.id}, Estudiante: {estud.id}, Apoderado: {apod.id}, Usuario: {prof.id}, Anamnesis: {anam.id}")
