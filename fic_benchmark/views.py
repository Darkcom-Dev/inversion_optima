from django.shortcuts import render, get_object_or_404
from .models import Statistic, Fund, Indicator
import json
import statistics as stats

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
        units_per_capita_MoM.append(round(stat.units_in_circulation/stat.investors,2))
        fund_value_per_capita_MoM.append(round(stat.value_fund/stat.investors,2))
        teorical_value_fund_MoM.append(round(stat.unit_value*stat.units_in_circulation/stat.investors,2))

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

    # Estadística descriptiva para unit_values_MoM
    descriptive_unit_value = {
        'mean' : calculate_statistics(unit_values_MoM, stats.mean),
        'median' : calculate_statistics(unit_values_MoM, stats.median),
        'mode' : calculate_statistics(unit_values_MoM, stats.mode),
        'std' : calculate_statistics(unit_values_MoM, stats.stdev),
        'max' : calculate_statistics(unit_values_MoM, max),
        'min' : calculate_statistics(unit_values_MoM, min),
    }

    # Estadística descriptiva para profitability_MoM
    descriptive_profitability = {
        'mean' : calculate_statistics(profitability_MoM, stats.mean),
        'median' : calculate_statistics(profitability_MoM, stats.median),
        'mode' : calculate_statistics(profitability_MoM, stats.mode),
        'std' : calculate_statistics(profitability_MoM, stats.stdev),
        'max' : calculate_statistics(profitability_MoM, max),
        'min' : calculate_statistics(profitability_MoM, min),
    }

    # Estadística descriptiva para volatility_MoM
    descriptive_volatility = {
        'mean' : calculate_statistics(volatility_MoM, stats.mean),
        'median' : calculate_statistics(volatility_MoM, stats.median),
        'mode' : calculate_statistics(volatility_MoM, stats.mode),
        'std' : calculate_statistics(volatility_MoM, stats.stdev),
        'max' : calculate_statistics(volatility_MoM, max),
        'min' : calculate_statistics(volatility_MoM, min),
    }

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
        'descriptive_unit_value': descriptive_unit_value,
        'descriptive_profitability': descriptive_profitability,
        'descriptive_volatility': descriptive_volatility,
        'profitability_diff_inflation_MoM': profitability_diff_inflation_MoM,
        'unit_values_diff_inflation_MoM': unit_values_diff_inflation_MoM
    }
    return values_dict

def get_statistics(fund_id, compare_fund_id):
    funds = Fund.objects.all()
    selected_fund = funds.filter(id=fund_id).first()
    compared_fund = funds.filter(id=compare_fund_id).first()
    all_statistics = Statistic.objects.all()
    filtered_statistics = all_statistics.filter(fund__id=fund_id).order_by('period')
    compared_filtered_statistics = all_statistics.filter(fund__id=compare_fund_id).order_by('period')
    indicators = Indicator.objects.all().order_by('period')

    values = get_values_from_funds(filtered_statistics, indicators)
    compared_values = get_values_from_funds(compared_filtered_statistics, indicators)

    context = {
        'funds': funds,
        'selected_fund': selected_fund,
        'compared_fund': compared_fund,
        'filtered_statistics': filtered_statistics,
        'compared_filtered_statistics': compared_filtered_statistics,
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
    indicators_periods = list(indicators.values_list('period', flat=True))
    indicators_dict = {'periods':dates_list_to_string(indicators_periods),
                       'inflation':list(indicators.values_list('inflation', flat=True)),
                       'interest_rate':list(indicators.values_list('interest_rate', flat=True))
                       }
    #descriptive_inflation = {
        #'mean' : calculate_statistics(indicators_dict['inflation'], stats.mean),
        #'median' : calculate_statistics(indicators_dict['inflation'], stats.median),
        #'mode' : calculate_statistics(indicators_dict['inflation'], stats.mode),
        #'std' : calculate_statistics(indicators_dict['inflation'], stats.stdev),
        #'max' : calculate_statistics(indicators_dict['inflation'], max),
        #'min' : calculate_statistics(indicators_dict['inflation'], min),
    #}
    """
    descriptive_interest_rate = {
        'mean' : calculate_statistics(indicators_dict['interest_rate'], stats.mean),
        'median' : calculate_statistics(indicators_dict['interest_rate'], stats.median),
        'mode' : calculate_statistics(indicators_dict['interest_rate'], stats.mode),
        'std' : calculate_statistics(indicators_dict['interest_rate'], stats.stdev),
        'max' : calculate_statistics(indicators_dict['interest_rate'], max),
        'min' : calculate_statistics(indicators_dict['interest_rate'], min),
    }
    indicators_dict['descriptive_inflation'] = descriptive_inflation
    indicators_dict['descriptive_interest_rate'] = descriptive_interest_rate
    """
    context = {
        'indicators': indicators,
        'indicators_dict': json.dumps(indicators_dict),
    }
    return render(request, 'fic_benchmark/indicators.html', context)