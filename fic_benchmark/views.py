from django.shortcuts import render, get_object_or_404

from .models import Statistic, Fund
import json
# Create your views here.

def index(request):
    rating = request.GET.get('rating', '')
    risk = request.GET.get('risk', '')

    funds = Fund.objects.all()

    if rating:
        funds = funds.filter(rating=rating)

    if risk:
        funds = funds.filter(risk_level=risk)
    context = {
        'funds': funds,
        'selected_rating': rating,
        'selected_risk': risk,
        'rating_choices': Fund._meta.get_field('rating').choices,
        'risk_level_choices': Fund._meta.get_field('risk_level').choices
    }
    return render(request, 'fic_benchmark/index.html', context)

def get_values_from_funds(statistics):
    periods = []
    value_funds_MoM = []
    units_in_circulation_MoM = []
    unit_values_MoM = []
    investors_MoM = []
    profitability_MoM = []
    volatility_MoM = []
    
    for stat in statistics:
        periods.append(stat.period.strftime('%Y-%m'))
        value_funds_MoM.append(stat.value_fund)
        units_in_circulation_MoM.append(stat.units_in_circulation)
        unit_values_MoM.append(stat.unit_value)
        investors_MoM.append(stat.investors)
        profitability_MoM.append(stat.profitability)
        volatility_MoM.append(stat.volatility)
    
    values_dict = {
        'periods': periods,
        'value_funds_MoM': value_funds_MoM,
        'units_in_circulation_MoM': units_in_circulation_MoM,
        'unit_values_MoM': unit_values_MoM,
        'investors_MoM': investors_MoM,
        'profitability_MoM': profitability_MoM,
        'volatility_MoM': volatility_MoM
    }
    return values_dict

def statistics(request):

    filtered_statistics = Statistic.objects.filter(fund__id=request.GET.get('fund_id', 14)).order_by('period')    
    values = get_values_from_funds(filtered_statistics)

    context = {
        'statistics': statistics,
        # Agrega cualquier otra variable de contexto que necesites
        'filtered_statistics': filtered_statistics,
        'values': json.dumps(values),
    }
    return render(request, 'fic_benchmark/statistics.html', context)
