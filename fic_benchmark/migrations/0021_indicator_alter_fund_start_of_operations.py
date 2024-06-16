# Generated by Django 4.2.13 on 2024-06-04 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fic_benchmark', '0020_alter_fund_fic_type_alter_fund_investment_type_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Indicator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('period', models.DateField()),
                ('inflation', models.FloatField(blank=True, null=True)),
                ('interest_rate', models.FloatField(blank=True, null=True)),
                ('ibr', models.FloatField(blank=True, null=True)),
            ],
        ),
        migrations.AlterField(
            model_name='fund',
            name='start_of_operations',
            field=models.DateField(),
        ),
    ]