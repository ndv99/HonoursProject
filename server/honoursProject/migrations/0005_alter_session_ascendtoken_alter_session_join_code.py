# Generated by Django 4.0.2 on 2022-04-07 18:26

from django.db import migrations, models
import honoursProject.models


class Migration(migrations.Migration):

    dependencies = [
        ('honoursProject', '0004_session_ascendtoken'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='ascendToken',
            field=models.CharField(max_length=2048),
        ),
        migrations.AlterField(
            model_name='session',
            name='join_code',
            field=models.CharField(default=honoursProject.models.create_random_code, max_length=6, unique=True),
        ),
    ]