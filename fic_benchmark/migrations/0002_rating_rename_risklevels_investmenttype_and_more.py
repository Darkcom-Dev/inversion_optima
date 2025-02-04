# Generated by Django 4.2.13 on 2024-06-01 16:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fic_benchmark', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fitch_rating', models.CharField(max_length=100)),
                ('moodys_rating', models.CharField(max_length=100)),
            ],
        ),
        migrations.RenameModel(
            old_name='RiskLevels',
            new_name='InvestmentType',
        ),
        migrations.RenameModel(
            old_name='Ratings',
            new_name='RiskLevel',
        ),
        migrations.DeleteModel(
            name='InvestmentTypes',
        ),
        migrations.RenameField(
            model_name='investmenttype',
            old_name='risk_level',
            new_name='investment_type',
        ),
        migrations.RenameField(
            model_name='risklevel',
            old_name='rating',
            new_name='risk_level',
        ),
    ]
