from django.contrib import admin
from .models import Product, SavedItem, Order

admin.site.register(Product)
admin.site.register(SavedItem)
admin.site.register(Order)

