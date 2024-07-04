from django.shortcuts import render, get_object_or_404
from .models import Statistic, Fund, Indicator
import json

from django.db.models import Avg, Min, Max, Sum, Count, StdDev, Variance, F, ExpressionWrapper, FloatField 

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

def get_values_from_funds(statistics, indicators):
    periods = []
    value_funds_MoM = []
    units_in_circulation_MoM = []
    unit_values_MoM = []
    investors_MoM = []
    profitability_MoM = []
    volatility_MoM = []

    units_per_capita_MoM = []
    fund_value_per_capita_MoM = []
    teorical_value_fund_MoM = []

    profitability_diff_inflation_MoM = [] # Poner aqui la resta de la inflación contra los rendmientos
    unit_values_diff_inflation_MoM = [] # Poner aqui la resta de la inflación contra la valoracion del fondo
    
    for stat in statistics:
        periods.append(stat.period.strftime('%Y-%m'))
        value_funds_MoM.append(round(stat.value_fund,2))
        units_in_circulation_MoM.append(round(stat.units_in_circulation,2))
        unit_values_MoM.append(round(stat.unit_value,2))
        investors_MoM.append(stat.investors)
        profitability_MoM.append(round(stat.profitability,2))
        volatility_MoM.append(round(stat.volatility,2))

        units_per_capita_MoM.append(round(stat.units_in_circulation / stat.investors,2))
        fund_value_per_capita_MoM.append(round(stat.value_fund / stat.investors,2))
        teorical_value_fund_MoM.append(round(stat.unit_value * stat.units_in_circulation / stat.investors,2))

        # Filtrar los indicadores que coincidan con el periodo del fondo
        matching_indicators = indicators.filter(period=stat.period)
        
        # Restar la inflación del porcentaje de rendimiento de los fondos
        if matching_indicators.first().inflation != None:
            profitability_diff_inflation_MoM.append(round(stat.profitability - matching_indicators.first().inflation, 2))
        else:
            profitability_diff_inflation_MoM.append(stat.profitability)
        
        if matching_indicators.first().interest_rate != None:
            unit_values_diff_inflation_MoM.append(round(stat.unit_value - matching_indicators.first().interest_rate, 2))
        else:
            unit_values_diff_inflation_MoM.append(stat.unit_value)

    values_dict = {
        'periods': periods,
        'value_funds_MoM': value_funds_MoM,
        'units_in_circulation_MoM': units_in_circulation_MoM,
        'unit_values_MoM': unit_values_MoM,
        'investors_MoM': investors_MoM,
        'profitability_MoM': profitability_MoM,
        'volatility_MoM': volatility_MoM,
        
        'units_per_capita_MoM': units_per_capita_MoM,
        'fund_value_per_capita_MoM': fund_value_per_capita_MoM,
        'teorical_value_fund_MoM': teorical_value_fund_MoM,

        'profitability_diff_inflation_MoM': profitability_diff_inflation_MoM,
        'unit_values_diff_inflation_MoM': unit_values_diff_inflation_MoM
    }
    return values_dict

def get_descriptive_stats(statistics):
    aggregated_stats = statistics.aggregate(
        fund_count=Count('fund'),
        value_fund_avg=Avg('value_fund'),
        value_fund_min=Min('value_fund'),
        value_fund_max=Max('value_fund'),
        value_fund_stddev=StdDev('value_fund'),
        value_fund_variance=Variance('value_fund'),
        value_fund_sum=Sum('value_fund'),
        units_in_circulation_avg=Avg('units_in_circulation'),
        units_in_circulation_min=Min('units_in_circulation'),
        units_in_circulation_max=Max('units_in_circulation'),
        units_in_circulation_stddev=StdDev('units_in_circulation'),
        units_in_circulation_variance=Variance('units_in_circulation'),
        units_in_circulation_sum=Sum('units_in_circulation'),
        unit_value_avg=Avg('unit_value'),
        unit_value_min=Min('unit_value'),
        unit_value_max=Max('unit_value'),
        unit_value_stddev=StdDev('unit_value'),
        unit_value_variance=Variance('unit_value'),
        unit_value_sum=Sum('unit_value'),
        investors_avg=Avg('investors'),
        investors_min=Min('investors'),
        investors_max=Max('investors'),
        investors_stddev=StdDev('investors'),
        investors_variance=Variance('investors'),
        investors_sum=Sum('investors'),
        profitability_avg=Avg('profitability'),
        profitability_min=Min('profitability'),
        profitability_max=Max('profitability'),
        profitability_stddev=StdDev('profitability'),
        profitability_variance=Variance('profitability'),
        profitability_sum=Sum('profitability'),
        volatility_avg=Avg('volatility'),
        volatility_min=Min('volatility'),
        volatility_max=Max('volatility'),
        volatility_stddev=StdDev('volatility'),
        volatility_variance=Variance('volatility'),
        volatility_sum=Sum('volatility'),
    )

    rounded_stats = {
        key: round(value, 2)
        for key, value in aggregated_stats.items()
    }

    return rounded_stats

def get_statistics(fund_id, compare_fund_id):
    funds = Fund.objects.all()
    selected_fund = funds.filter(id=fund_id).first()
    compared_fund = funds.filter(id=compare_fund_id).first()
    all_statistics = Statistic.objects.all()

    filtered_statistics = all_statistics.filter(fund__id=fund_id).order_by('period')
    #value_funds_per_capita = filtered_statistics.objects.annotate(sum=F('field1') + F('field2')).values('sum')
    filtered_stats = {}
    if filtered_statistics.count() > 0:
        filtered_stats = get_descriptive_stats(filtered_statistics)
    compared_filtered_statistics = all_statistics.filter(fund__id=compare_fund_id).order_by('period')
    compared_stats = {}
    if compared_filtered_statistics.count() > 0:
        compared_stats = get_descriptive_stats(compared_filtered_statistics)
    
    print(type(filtered_stats))

    indicators = Indicator.objects.all().order_by('period')

    values = get_values_from_funds(filtered_statistics, indicators)
    compared_values = get_values_from_funds(compared_filtered_statistics, indicators)

    context = {
        'funds': funds,
        'selected_fund': selected_fund,
        'compared_fund': compared_fund,
        'filtered_statistics': filtered_statistics,
        'filtered_stats': filtered_stats,
        'filtered_stats_json': json.dumps(filtered_stats),
        'compared_filtered_statistics': compared_filtered_statistics,
        'compared_stats': compared_stats,
        'values': json.dumps(values),
        'compared_values': json.dumps(compared_values),
    }
    return context


def dates_list_to_string(dates_list):
    return [str(date) for date in dates_list]

def statistics(request):
    fund_id = request.GET.get('fund_id', request.GET.get('fund.id', None))
    compare_fund_id = request.GET.get('compare_fund_id', request.GET.get('compare_fund.id', None))
    context = get_statistics(fund_id, compare_fund_id)
    return render(request, 'fic_benchmark/statistics.html', context)

def calculate_statistics(data, stats_func):
    return round(stats_func(data), 2) if len(data) > 0 else 0

def indicators(request):
    indicators = Indicator.objects.all().order_by('period')

    inflation_stats = indicators.aggregate(
        avg_inflation=Avg('inflation'),
        min_inflation=Min('inflation'),
        max_inflation=Max('inflation'),
        std_inflation=StdDev('inflation'),
        variance_inflation=Variance('inflation'),
        sum_inflation=Sum('inflation'),
        count_inflation=Count('inflation')
    )

    interest_rate_stats = indicators.aggregate(
        avg_interest_rate=Avg('interest_rate'),
        min_interest_rate=Min('interest_rate'),
        max_interest_rate=Max('interest_rate'),
        std_interest_rate=StdDev('interest_rate'),
        variance_interest_rate=Variance('interest_rate'),
        sum_interest_rate=Sum('interest_rate'),
        count_interest_rate=Count('interest_rate')
    )

    inflation_stats = {key: round(value, 2) for key, value in inflation_stats.items()}
    interest_rate_stats = {key: round(value, 2) for key, value in interest_rate_stats.items()}

    indicators_periods = list(indicators.values_list('period', flat=True))
    indicators_dict = {
        'periods': dates_list_to_string(indicators_periods),
        'inflation': list(indicators.values_list('inflation', flat=True)),
        'interest_rate': list(indicators.values_list('interest_rate', flat=True))
    }

    context = {
        'indicators': indicators,
        'inflation_stats': inflation_stats,
        'interest_rate_stats': interest_rate_stats,
        'indicators_dict': json.dumps(indicators_dict),
    }

    return render(request, 'fic_benchmark/indicators.html', context)
