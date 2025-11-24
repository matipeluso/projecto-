from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0002_seed_subdimension_areas"),
    ]

    operations = [
        migrations.AddField(
            model_name="evaluacionpsicopedagogica",
            name="edad_anios",
            field=models.PositiveSmallIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="evaluacionpsicopedagogica",
            name="edad_meses",
            field=models.PositiveSmallIntegerField(blank=True, null=True),
        ),
    ]
