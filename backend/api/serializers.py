from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Item
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
    price = serializers.JSONField()

    class Meta:
        model = Item
        fields = ["id", "name", "price", "category", "quantity"]

    def to_representation(self, instance):
        """Convert Money object to JSON-compatible format."""
        representation = super().to_representation(instance)
        if isinstance(instance.price, Money):
            representation['price'] = {
                "amount": instance.price.amount
            }
        return representation

    def create(self, validated_data):
        price = validated_data.pop('price')
        validated_data['price'] = Money(price['amount'], 'GBP')
        return super().create(validated_data)

class AddToBasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ["id", "name", "price", "category", "quantity"]
