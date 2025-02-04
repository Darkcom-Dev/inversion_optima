# Generated by Django 4.2.13 on 2024-06-03 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fic_benchmark', '0017_rename_fic_type_fictype_type_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='fictype',
            old_name='type',
            new_name='fic_type',
        ),
        migrations.RenameField(
            model_name='investmenttype',
            old_name='type',
            new_name='investment_type',
        ),
        migrations.RenameField(
            model_name='risklevel',
            old_name='level',
            new_name='risk_level',
        ),
        migrations.AlterField(
            model_name='fund',
            name='minimum_investment',
            field=models.FloatField(verbose_name='Minimo de inversión'),
        ),
        migrations.AlterField(
            model_name='position',
            name='issuer',
            field=models.CharField(max_length=100, verbose_name='Emisor'),
        ),
        migrations.AlterField(
            model_name='statistic',
            name='investors',
            field=models.IntegerField(verbose_name='Inversionistas'),
        ),
        migrations.AlterField(
            model_name='statistic',
            name='profitability',
            field=models.FloatField(verbose_name='Rentabilidad último mes en %'),
        ),
        migrations.AlterField(
            model_name='statistic',
            name='unit_value',
            field=models.FloatField(verbose_name='Valor de la unidad'),
        ),
        migrations.AlterField(
            model_name='statistic',
            name='units_in_circulation',
            field=models.FloatField(verbose_name='Unidades en circulación'),
        ),
        migrations.AlterField(
            model_name='statistic',
            name='value_fund',
            field=models.FloatField(verbose_name='Valor del fondo en MM'),
        ),
        migrations.AlterField(
            model_name='statistic',
            name='volatility',
            field=models.FloatField(verbose_name='Volatilidad último mes en %'),
        ),
    ]
