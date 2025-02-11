from django.contrib.auth.models import AbstractUser
from django.core.files.storage import FileSystemStorage
from django.db import models
from djmoney.models.fields import MoneyField

CATEGORIES = (
    ("SNACKS", "snacks"),
    ("HOUSEHOLD", "household"),
    ("DAIRY", "dairy"),
    ("VEGETABLE", "vegetable"),
    ("FRUIT", "fruit"),
    ("STATIONERY", "stationery"),
    ("ELECTRONICS", "electronics"),
    ("CLEANING", "cleaning"),
)


class Item(models.Model):
    name = models.CharField(max_length=100)
    price = MoneyField(default_currency="GBP", max_digits=6, decimal_places=2)
    category = models.CharField(choices=CATEGORIES)
    quantity = models.IntegerField(default=50, editable=True)
    image = models.ImageField(default="../static/default.png", upload_to="static/", storage=FileSystemStorage(allow_overwrite=True))

    def __str__(self):
        return self.name

    def decrease_stock(item_id, quantity):
        res = Item.objects.get(pk=item_id)

        if res.quantity >= quantity:
            res.quantity -= quantity
            res.save()
        else:
            return "Not enough stock available"


class User(AbstractUser):
    avatar = models.ImageField()


class Basket(models.Model):
    total = models.DecimalField(decimal_places=2, max_digits=5, default=0.00)
    quantity = models.IntegerField(default=0)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Basket of {self.user.username}"


class BasketItem(models.Model):
    basket = models.ForeignKey(Basket, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    item_quantity = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Items in basket {self.user.username}"
