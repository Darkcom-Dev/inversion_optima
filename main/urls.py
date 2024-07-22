
from . import views
from django.urls import path

app_name = 'main'
urlpatterns = [
    path('terminos-y-condiciones/', views.terminos_y_condiciones, name='terminos-y-condiciones'),
    path('acerca-de/', views.acerca_de, name='acerca-de'),
    path('politicas-de-privacidad/', views.politicas_de_privacidad, name='politicas-de-privacidad'),
]