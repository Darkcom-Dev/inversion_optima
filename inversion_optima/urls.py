"""
URL configuration for inversion_optima project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib import sitemaps
from django.contrib.sitemaps.views import sitemap
from fic_benchmark.sitemaps import StaticViewSitemap as fbs
from main.sitemaps import StaticViewSitemap as ms
sitemaps = {
    'static': fbs,
    'main': ms
}

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('fic_benchmark.urls', namespace='fic_benchmark')),
    path('', include('main.urls', namespace='main')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
]
