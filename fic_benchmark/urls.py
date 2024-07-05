from . import views
from django.urls import path


app_name = 'fic_benchmark'
urlpatterns = [
    path('', views.index, name='index'),
    path('statistics/', views.comparative_statistics, name='statistics'),#'<int:funds_id>/
    path('fund_statistics/', views.fund_statistics, name='fund_statistics'),#'<int:funds_id>/
    path('indicators/', views.indicators, name='indicators'),#'<int:funds_id>/
]