from django.db import models
from django.contrib.auth.models import AbstractUser
from djmoney.models.fields import MoneyField

CATEGORIES = (
    ("SNACKS", "snacks"),
)


class Item(models.Model):
    name = models.CharField(max_length=100)
    price = MoneyField(default_currency='GBP', max_digits=4, decimal_places=2)
    category = models.CharField(choices=CATEGORIES)
    quantity = models.IntegerField(default=50, editable=True)

    def __str__(self):
        return self.name


class User(AbstractUser):
    avatar = models.ImageField()


class Basket(models.Model):
    basket_id = models.CharField(primary_key=True, editable=False)
    total = models.DecimalField(decimal_places=2, max_digits=5, default=0.00)
    quantity = models.IntegerField()
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Basket of {self.user.username} (ID: {self.basket_id})"


class BasketItem(models.Model):
    basket = models.ForeignKey(Basket, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    item_quantity = models.IntegerField(default=0)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
