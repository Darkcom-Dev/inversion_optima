from . import views
from django.urls import path


app_name = 'fic_benchmark'
urlpatterns = [
    path('', views.index, name='index'),
    path('statistics/', views.statistics, name='statistics'),#'<int:funds_id>/
]