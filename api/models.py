from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    sku = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50)
    description = models.TextField()
    image_url = models.CharField(max_length=500, null=True, blank=True)

    def __str__(self):
        return f"{self.brand} - {self.name}"
    
class SavedItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    is_cart = models.BooleanField(default=False)
    is_wishlist = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1, null=True, blank=True)

    def __str__(self):
        item_type = ""
        if self.is_cart:
            item_type += "Cart"
        if self.is_wishlist:
            item_type += "Wishlist"
        username = self.user.username if self.user else ""
        return f"{username} - {item_type} - {self.product.name}"

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    saved_items = models.ManyToManyField(SavedItem)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    order_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    shipping_address = models.CharField(max_length=500, null=True, blank=True)
    payment_method = models.CharField(max_length=100, null=True, blank=True)
    is_paid = models.BooleanField(default=False, null=True, blank=True)

    def __str__(self):
        return f"Order for {self.user.username} on {self.order_date}"