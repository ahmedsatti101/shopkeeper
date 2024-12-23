from django.db import models
from django.contrib.auth.models import AbstractUser
from djmoney.models.fields import MoneyField

CATEGORIES = (
    ("SNACKS", "snacks"),
)


class Item(models.Model):
    name = models.CharField(max_length=100)
    price = MoneyField(default_currency='GBP', max_digits=19, decimal_places=4)
    category = models.CharField(choices=CATEGORIES)
    quantity = models.IntegerField(default=50, editable=True)

    def __str__(self):
        return self.name


class User(AbstractUser):
    basket = models.JSONField(blank=True, default=dict)
    avatar = models.ImageField()
