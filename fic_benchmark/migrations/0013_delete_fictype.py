# Generated by Django 4.2.13 on 2024-06-03 00:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fic_benchmark', '0012_remove_fund_fic_type'),
    ]

    operations = [
        migrations.DeleteModel(
            name='FICType',
        ),
    ]
