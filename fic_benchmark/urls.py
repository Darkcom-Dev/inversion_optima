from . import views
from django.urls import path


app_name = 'fic_benchmark'
urlpatterns = [
    path('', views.index, name='index'),
    #path('<int:funds_id>/', views.funds, name='funds'),
]