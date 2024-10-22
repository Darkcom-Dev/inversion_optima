# main/sitemaps.py
from django.contrib.sitemaps import Sitemap
from django.urls import reverse

class StaticViewSitemap(Sitemap):
    priority = 0.5
    changefreq = 'monthly'

    def items(self):
        return [
            'fic_benchmark:index',
            'fic_benchmark:statistics',
            'fic_benchmark:fund_statistics',
            'fic_benchmark:indicators',
        ]

    def location(self, item):
        return reverse(item)
