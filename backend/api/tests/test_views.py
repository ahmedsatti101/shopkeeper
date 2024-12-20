from django.test import TestCase, Client
from api.serializers import ItemSerializer
from api.models import Item
from rest_framework import status
import json
from django.urls import reverse

client = Client()


def create_item(name, category, quantity):
    return Item.objects.create(name=name, category=category, quantity=quantity)


class ItemsViewTests(TestCase):
    def test_no_items_exist(self):
        response = client.get("/api/items/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
