from django.test import TestCase, Client
from api.serializers import ItemSerializer
from api.models import Item
from rest_framework import status
from djmoney.money import Money

client = Client()


class ItemsViewTests(TestCase):
    def setUp(self):
        self.item1 = Item.objects.create(name="Item 1", price=Money(10, 'GBP'),
                                         category="Snack", quantity=2000)
        self.item2 = Item.objects.create(name="Item 2", price=Money(20, 'GBP'),
                                         category="Drink", quantity=5000)
        self.lucazede = Item.objects.create(name="Lucazede", price=Money(1.80, 'GBP'),
                                            category="Drink", quantity="100")
        self.onion = Item.objects.create(name="Onions", price=Money(1.20, 'GBP'),
                                         category="Vegetable", quantity="1000")
        self.maxDiff = None

    def test_no_items_exist(self):
        Item.objects.all().delete()
        response = client.get("/api/items/")
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_all_items(self):
        response = client.get("/api/items/")
        items = Item.objects.all().order_by('price')
        serializer = ItemSerializer(items, many=True)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"items": serializer.data})

    def test_should_return_404_for_wrong_endpoint(self):
        response = client.get("/api/item/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_data_filtered_by_query_param(self):
        response = client.get("/api/items/?q=te")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_no_data_returned_from_query(self):
        response = client.get("/api/items/?q=cadb")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_sort_items_by_price_default_ascending(self):
        response = client.get("/api/items/")
        items = response.data['items']
        items_from_db = Item.objects.all().order_by('price')
        serializer = ItemSerializer(items_from_db, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(items, serializer.data)

    def test_sort_items_by_price_descending_order(self):
        response = client.get("/api/items/?order_by=desc")
        items = response.data['items']
        items_from_db = Item.objects.all().order_by('-price')
        serializer = ItemSerializer(items_from_db, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(items, serializer.data)

    def test_sort_items_by_quantity_default_descending(self):
        response = client.get("/api/items/?sort_by=quantity")
        items = response.data['items']
        items_from_db = Item.objects.all().order_by('-quantity')
        serializer = ItemSerializer(items_from_db, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(items, serializer.data)

    def test_sort_items_by_quantity_ascending(self):
        response = client.get("/api/items/?sort_by=quantity&order_by=asc")
        items = response.data['items']
        items_from_db = Item.objects.all().order_by('quantity')
        serializer = ItemSerializer(items_from_db, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(items, serializer.data)

    def test_add_items_to_basket(self):
        response = client.post("/api/basket/", data={"name": self.item1.name,
                                                     "category": self.item1.category,
                                                     "price": self.item1.price,
                                                     "quantity": self.item1.quantity}, content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
