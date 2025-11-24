from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0003_evaluacionpsicopedagogica_edad_fields"),
    ]

    operations = [
        migrations.AddField(
            model_name="evaluacionpsicopedagogica",
            name="lengua_materna_grado",
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
        migrations.AddField(
            model_name="evaluacionpsicopedagogica",
            name="lengua_materna_comprende",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="evaluacionpsicopedagogica",
            name="lengua_materna_habla",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="evaluacionpsicopedagogica",
            name="lengua_materna_lee",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="evaluacionpsicopedagogica",
            name="lengua_materna_escribe",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="evaluacionpsicopedagogica",
            name="lengua_uso_grado",
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
        migrations.AddField(
            model_name="evaluacionpsicopedagogica",
            name="lengua_uso_comprende",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="evaluacionpsicopedagogica",
            name="lengua_uso_habla",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="evaluacionpsicopedagogica",
            name="lengua_uso_lee",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="evaluacionpsicopedagogica",
            name="lengua_uso_escribe",
            field=models.BooleanField(default=False),
        ),
    ]
