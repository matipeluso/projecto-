from django.db import migrations

AREAS = [
    ("Habilidades comunicativas", "habilidades-comunicativas"),
    ("Habilidades sociales y afectividad", "habilidades-sociales-afectividad"),
    ("Motricidad y cuidado de sí mismo", "motricidad-cuidado-personal"),
    ("Aproximación al aprendizaje", "aproximacion-aprendizaje"),
    ("Habilidades cognitivas", "habilidades-cognitivas"),
    ("Capacidades sensoperceptivas", "capacidades-sensoperceptivas"),
    ("Lectura y escritura", "lectura-escritura"),
    ("Matemáticas", "matematicas"),
]


def forward(apps, schema_editor):
    Area = apps.get_model("core", "SubdimensionArea")
    for nombre, slug in AREAS:
        Area.objects.update_or_create(
            nombre=nombre,
            defaults={"slug": slug},
        )


def reverse(apps, schema_editor):
    Area = apps.get_model("core", "SubdimensionArea")
    Area.objects.filter(slug__in=[slug for _, slug in AREAS]).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [migrations.RunPython(forward, reverse)]
