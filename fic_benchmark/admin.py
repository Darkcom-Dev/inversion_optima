from django.contrib import admin
from . import models

admin.site.register(models.Indicator)
admin.site.register(models.FundManager)
admin.site.register(models.Fund)

class PositionInline(admin.TabularInline):
    model = models.Position
    extra = 1

class StatisticAdmin(admin.ModelAdmin):
    inlines = [PositionInline]
    list_filter = ['fund', 'period']

admin.site.register(models.Statistic, StatisticAdmin)