from django.shortcuts import render

from .models import FundManager, Fund

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
"""
def funds(request, fund_id):
    fundmanagers = FundManager.objects.get(id=fund_id)
    context = {
        'fund_managers': fundmanagers
    }
    return render(request, 'fic_benchmark/funds.html', context)
"""