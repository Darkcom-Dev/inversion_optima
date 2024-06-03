from django.contrib import admin
from . import models

admin.site.register(models.FundManager)
admin.site.register(models.Fund)

class PositionInline(admin.TabularInline):
    model = models.Position
    extra = 1

class StatisticAdmin(admin.ModelAdmin):
    inlines = [PositionInline]

admin.site.register(models.Statistic, StatisticAdmin)