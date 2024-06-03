# Generated by Django 4.2.13 on 2024-06-02 16:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fic_benchmark', '0005_alter_position_issuer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='statistic',
            name='Positions',
        ),
        migrations.AddField(
            model_name='position',
            name='statistic',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='fic_benchmark.statistic'),
            preserve_default=False,
        ),
    ]