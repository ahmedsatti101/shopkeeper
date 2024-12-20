from django.test import TestCase, Client
from api.serializers import ItemSerializer
from api.models import Item
from rest_framework import status

client = Client()


class ItemsViewTests(TestCase):
    def setUp(self):
        self.item1 = Item.objects.create(name="Item 1", price=10.0,
                                         category="Snack", quantity=2000)
        self.item2 = Item.objects.create(name="Item 2", price=20.0,
                                         category="Drink", quantity=5000)

    def test_no_items_exist(self):
        Item.objects.all().delete()
        response = client.get("/api/items/")
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, text="No items available")

    def test_get_all_items(self):
        response = client.get("/api/items/")
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"items": serializer.data})

    def test_sould_return_404_for_wrong_endpoint(self):
        response = client.get("/api/item/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
