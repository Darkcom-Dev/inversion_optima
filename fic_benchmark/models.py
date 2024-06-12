from django.db import models

# Create your models here.
class FundManager(models.Model):
    name = models.CharField(max_length=100)
    url = models.URLField(max_length=200)

    def __str__(self):
        return self.name

class Fund(models.Model):
    name = models.CharField(max_length=100)
    url = models.URLField(max_length=200)
    ticker = models.CharField(max_length=100, blank=True, null=True)
    start_of_operations = models.DateField()
    description = models.TextField()
    minimum_investment = models.FloatField(verbose_name='Minimo de inversión')
    fee = models.FloatField()
    fic_type = models.IntegerField(choices=[
        (1, 'FIC'),
        (2, 'FICI'),
        (3, 'FIC Cerrado'),
        (4, 'FIC Abierto sin pacto de permanencia'),
        (8, 'Otro')
    ])
    fund_manager = models.ForeignKey(FundManager, on_delete=models.CASCADE)
    investment_type = models.IntegerField(choices=[
        (1, 'Renta Fija'),
        (2, 'Renta Variable'),
        (3, 'Mixta RV/RF')
    ])
    risk_level = models.IntegerField(choices=[
        (1, 'Conservador'),
        (2, 'Medio'),
        (3, 'Alto Riesgo'),
        (4, 'Muy alto')
    ])
    rating = models.IntegerField(choices=[
        (1, 'AAA'),
        (2, 'AA+'),
        (3, 'AA'),
        (4, 'AA-'),
        (5, 'A+'),
        (6, 'A'),
        (7, 'A-'),
        (8, 'BBB+'),
        (9, 'BBB'),
        (10, 'BBB-'),
        (11, 'BB+'),
        (12, 'BB'),
        (13, 'BB-'),
        (14, 'B+'),
        (15, 'B'),
        (16, 'B-'),
        (17, 'CCC+'),
        (18, 'CCC'),
        (19, 'CCC-'),
        (20, 'CC'),
        (21, 'C'),
        (22, 'RD'),
        (23, 'D'),
    ])

    def get_risk_level_display(self):
        return dict(self._meta.get_field('risk_level').choices).get(self.risk_level, '')

    def get_rating_display(self):
        return dict(self._meta.get_field('rating').choices).get(self.rating, '')

    def __str__(self):
        return self.name
    
class Statistic(models.Model):
    fund = models.ForeignKey(Fund, on_delete=models.CASCADE)
    period = models.DateField()
    value_fund = models.FloatField(verbose_name='Valor del fondo en MM')
    units_in_circulation = models.FloatField(verbose_name='Unidades en circulación')
    unit_value = models.FloatField(verbose_name='Valor de la unidad')
    investors = models.PositiveIntegerField(verbose_name='Inversionistas')
    profitability = models.FloatField(verbose_name='Rentabilidad último mes en %')
    volatility = models.FloatField(verbose_name='Volatilidad último mes en %')

    def __str__(self):
        return f'{self.fund} {self.period}'
    
class Position(models.Model):
    statistic = models.ForeignKey(Statistic, on_delete=models.CASCADE, default=1)
    issuer = models.CharField(max_length=100, verbose_name='Emisor')
    participation = models.FloatField()

    def __str__(self):
        return f'{self.issuer} {self.participation} % {self.statistic.fund} {self.statistic.period}'
    
class Indicator(models.Model):
    period = models.DateField()
    inflation = models.FloatField(blank=True, null=True)
    interest_rate = models.FloatField(blank=True, null=True)
    
    def __str__(self):
        return f'{self.period}'

