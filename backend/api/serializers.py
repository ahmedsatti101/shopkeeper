from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Item, BasketItem
from djmoney.money import Money

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwagrs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        return user


class ItemSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ["id", "name", "price", "category", "quantity"]

    def get_price(self, obj):
        if isinstance(obj.price, Money):
            return f"{obj.price.amount:.2f}"
        return f"{obj.price:.2f}"


class BasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasketItem
        fields = ["item", "item_quantity"]
