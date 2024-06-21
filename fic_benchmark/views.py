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

def get_statistics(fund_id, compare_fund_id):
    funds = Fund.objects.all()
    selected_fund = funds.filter(id=fund_id).first()
    compared_fund = funds.filter(id=compare_fund_id).first()
    all_statistics = Statistic.objects.all()
    filtered_statistics = all_statistics.filter(fund__id=fund_id).order_by('period')
    compared_filtered_statistics = all_statistics.filter(fund__id=compare_fund_id).order_by('period')
    values = get_values_from_funds(filtered_statistics)
    compared_values = get_values_from_funds(compared_filtered_statistics)

    context = {
        'funds': funds,
        'selected_fund': selected_fund,
        'compared_fund': compared_fund,
        'filtered_statistics': filtered_statistics,
        'compared_filtered_statistics': compared_filtered_statistics,
        'values': json.dumps(values),
        'compared_values': json.dumps(compared_values)
    }
    return context


def statistics(request):
    fund_id = request.GET.get('fund_id', request.GET.get('fund.id', None))
    compare_fund_id = request.GET.get('compare_fund_id', request.GET.get('compare_fund.id', None))
    context = get_statistics(fund_id, compare_fund_id)
    return render(request, 'fic_benchmark/statistics.html', context)
