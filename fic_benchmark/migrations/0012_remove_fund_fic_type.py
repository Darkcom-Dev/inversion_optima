# Generated by Django 4.2.13 on 2024-06-03 00:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fic_benchmark', '0011_fictype_fund_ticker_alter_fund_minimum_investment_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='fund',
            name='fic_type',
        ),
    ]