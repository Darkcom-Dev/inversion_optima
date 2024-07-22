# main/sitemaps.py
from django.contrib.sitemaps import Sitemap
from django.urls import reverse

class StaticViewSitemap(Sitemap):
    priority = 0.5
    changefreq = 'monthly'

    def items(self):
        return [
            'main:terminos-y-condiciones',
            'main:acerca-de',
            'main:politicas-de-privacidad'
        ]

    def location(self, item):
        return reverse(item)
