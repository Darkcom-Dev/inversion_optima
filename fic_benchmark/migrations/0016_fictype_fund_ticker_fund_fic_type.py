# Generated by Django 4.2.13 on 2024-06-03 19:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fic_benchmark', '0015_delete_fictype_remove_fund_ticker'),
    ]

    operations = [
        migrations.CreateModel(
            name='FICType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fic_type', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='fund',
            name='ticker',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='fund',
            name='fic_type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='fic_benchmark.fictype'),
        ),
    ]