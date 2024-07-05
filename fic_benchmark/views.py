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

def get_monthly_values(statistics, indicators):
    periods = []
    fund_values = []
    units_in_circulation = []
    unit_values = []
    investors = []
    profitability = []
    volatility = []

    units_per_investor = []
    fund_value_per_investor = []
    theoretical_fund_value = []

    profitability_diff_inflation = []
    unit_values_diff_inflation = []
    
    for stat in statistics:
        periods.append(stat.period.strftime('%Y-%m'))
        fund_values.append(round(stat.value_fund,2))
        units_in_circulation.append(round(stat.units_in_circulation,2))
        unit_values.append(round(stat.unit_value,2))
        investors.append(stat.investors)
        profitability.append(round(stat.profitability,2))
        volatility.append(round(stat.volatility,2))

        units_per_investor.append(round(stat.units_in_circulation / stat.investors,2))
        fund_value_per_investor.append(round(stat.value_fund / stat.investors,2))
        theoretical_fund_value.append(round(stat.unit_value * stat.units_in_circulation / stat.investors,2))

        matching_indicators = indicators.filter(period=stat.period)
        
        if matching_indicators.first().inflation:
            profitability_diff_inflation.append(round(stat.profitability - matching_indicators.first().inflation, 2))
        else:
            profitability_diff_inflation.append(stat.profitability)
        
        if matching_indicators.first().interest_rate:
            unit_values_diff_inflation.append(round(stat.unit_value - matching_indicators.first().interest_rate, 2))
        else:
            unit_values_diff_inflation.append(stat.unit_value)

    stats_dict = {
        'periods': periods,
        'fund_values': fund_values,
        'units_in_circulation': units_in_circulation,
        'unit_values': unit_values,
        'investors': investors,
        'profitability': profitability,
        'volatility': volatility,
        
        'units_per_investor': units_per_investor,
        'fund_value_per_investor': fund_value_per_investor,
        'theoretical_fund_value': theoretical_fund_value,

        'profitability_diff_inflation': profitability_diff_inflation,
        'unit_values_diff_inflation': unit_values_diff_inflation
    }
    return stats_dict

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

def get_filtered_statistics(funds, all_statistics, indicators, compared_fund_id):
    fund = funds.filter(id=compared_fund_id).first()
    filtered_statistics = all_statistics.filter(fund__id=compared_fund_id).order_by('period')

    descriptive_stats = {}
    if filtered_statistics.exists():
        descriptive_stats = get_descriptive_stats(filtered_statistics)

    stats_dict = get_monthly_values(filtered_statistics, indicators)

    return fund, filtered_statistics, descriptive_stats, stats_dict

def get_comparative_statistics(fund_id, compare_fund_id):
    funds = Fund.objects.all()
    all_statistics = Statistic.objects.all()
    indicators = Indicator.objects.all().order_by('period')

    selected_fund, filtered_statistics, filtered_stats, values = get_filtered_statistics(funds, all_statistics, indicators, fund_id)
    compared_fund, compared_filtered_statistics, compared_stats, compared_values = get_filtered_statistics(funds, all_statistics, indicators, compare_fund_id)

    context = {
        'funds': funds,
        'selected_fund': selected_fund,
        'filtered_statistics': filtered_statistics,
        'filtered_stats': filtered_stats,
        'filtered_stats_json': json.dumps(filtered_stats),
        'values': json.dumps(values),
        'compared_fund': compared_fund,
        'compared_filtered_statistics': compared_filtered_statistics,
        'compared_stats': compared_stats,
        'compared_values': json.dumps(compared_values),
    }
    return context

def get_statistics(fund_id):
    funds = Fund.objects.all()
    all_statistics = Statistic.objects.all()
    indicators = Indicator.objects.all().order_by('period')

    selected_fund, filtered_statistics, filtered_stats, values = get_filtered_statistics(funds, all_statistics, indicators, fund_id)

    context = {
        'funds': funds,
        'selected_fund': selected_fund,
        'filtered_statistics': filtered_statistics,
        'filtered_stats': filtered_stats,
        'filtered_stats_json': json.dumps(filtered_stats),
        'values': json.dumps(values),
    }
    return context

def dates_list_to_string(dates_list):
    return [str(date) for date in dates_list]

def comparative_statistics(request):
    fund_id = request.GET.get('fund_id', request.GET.get('fund.id', None))
    compare_fund_id = request.GET.get('compare_fund_id', request.GET.get('compare_fund.id', None))
    context = get_comparative_statistics(fund_id, compare_fund_id)
    return render(request, 'fic_benchmark/statistics.html', context)

def fund_statistics(request):
    fund_id = request.GET.get('fund_id', request.GET.get('fund.id', None))
    context = get_statistics(fund_id)
    return render(request, 'fic_benchmark/fund_statistics.html', context)

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
