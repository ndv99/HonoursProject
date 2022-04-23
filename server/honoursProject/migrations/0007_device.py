# Generated by Django 4.0.2 on 2022-04-23 21:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('honoursProject', '0006_alter_session_ascendtoken_alter_session_join_code'),
    ]

    operations = [
        migrations.CreateModel(
            name='Device',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mode', models.IntegerField(blank=True, default=0)),
                ('session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='devices', to='honoursProject.session')),
            ],
        ),
    ]