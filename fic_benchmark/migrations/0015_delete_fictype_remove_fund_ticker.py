# Generated by Django 4.2.13 on 2024-06-03 00:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fic_benchmark', '0014_fictype'),
    ]

    operations = [
        migrations.DeleteModel(
            name='FICType',
        ),
        migrations.RemoveField(
            model_name='fund',
            name='ticker',
        ),
    ]