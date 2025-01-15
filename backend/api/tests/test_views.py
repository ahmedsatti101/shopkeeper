import json

from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.test import Client, TestCase
from djmoney.money import Money
from rest_framework import status
from rest_framework.test import APIClient

from api.models import Basket, BasketItem, Item
from api.serializers import ItemSerializer

client = Client()


class ItemsViewTests(TestCase):
    def setUp(self):
        self.item1 = Item.objects.create(
            name="Item 1", price=Money(10, "GBP"), category="Snack", quantity=2000
        )
        self.item2 = Item.objects.create(
            name="Item 2", price=Money(20, "GBP"), category="Drink", quantity=5000
        )
        self.lucazede = Item.objects.create(
            name="Lucazede", price=Money(1.80, "GBP"), category="Drink", quantity="100"
        )
        self.onion = Item.objects.create(
            name="Onions",
            price=Money(1.20, "GBP"),
            category="Vegetable",
            quantity="1000",
        )
        self.maxDiff = None

    def test_no_items_exist(self):
        Item.objects.all().delete()
        response = client.get("/api/items/")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_all_items(self):
        response = client.get("/api/items/")
        items = Item.objects.all().order_by("price")
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
        items = response.data["items"]
        items_from_db = Item.objects.all().order_by("price")
        serializer = ItemSerializer(items_from_db, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(items, serializer.data)

    def test_sort_items_by_price_descending_order(self):
        response = client.get("/api/items/?order_by=desc")
        items = response.data["items"]
        items_from_db = Item.objects.all().order_by("-price")
        serializer = ItemSerializer(items_from_db, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(items, serializer.data)

    def test_sort_items_by_quantity_default_descending(self):
        response = client.get("/api/items/?sort_by=quantity")
        items = response.data["items"]
        items_from_db = Item.objects.all().order_by("-quantity")
        serializer = ItemSerializer(items_from_db, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(items, serializer.data)

    def test_sort_items_by_quantity_ascending(self):
        response = client.get("/api/items/?sort_by=quantity&order_by=asc")
        items = response.data["items"]
        items_from_db = Item.objects.all().order_by("quantity")
        serializer = ItemSerializer(items_from_db, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(items, serializer.data)

    def test_add_items_to_basket(self):
        client = APIClient()
        User = get_user_model()
        user = User.objects.create_user(username="testuser", password="password")
        client.login(username="testuser", password="password")

        request_data = json.dumps(
            {
                "item_id": self.lucazede.id,
                "quantity": 1,
                "username": user.username,
                "password": user.password,
            }
        )

        response = client.post(
            "/api/basket/", data=request_data, content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_quantity_of_item_decreased_when_added_to_basket(self):
        client = APIClient()
        User = get_user_model()
        user = User.objects.create_user(username="testuser", password="password")
        client.login(username="testuser", password="password")

        request_data = json.dumps(
            {
                "item_id": self.onion.id,
                "quantity": 1,
                "username": user.username,
                "password": user.password,
            }
        )

        response = client.post(
            "/api/basket/", data=request_data, content_type="application/json"
        )

        res = get_object_or_404(Item, name="Onions")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.quantity, 999)

    def test_total_sum_for_basket(self):
        client = APIClient()
        User = get_user_model()
        user = User.objects.create_user(username="testuser", password="password")
        client.login(username="testuser", password="password")

        request_data = json.dumps(
            {
                "item_id": self.onion.id,
                "quantity": 1,
                "username": user.username,
                "password": user.password,
            }
        )

        response = client.post(
            "/api/basket/", data=request_data, content_type="application/json"
        )

        res = get_object_or_404(Item, name="Onions")
        basket = Basket.objects.get(user=user)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.quantity, 999)
        self.assertEqual(basket.total, res.price.amount)

    def test_total_sum_for_basket_with_larger_quantity(self):
        client = APIClient()
        User = get_user_model()
        user = User.objects.create_user(username="testuser", password="password")
        client.login(username="testuser", password="password")

        request_data = json.dumps(
            {
                "item_id": self.lucazede.id,
                "quantity": 10,
                "username": user.username,
                "password": user.password,
            }
        )

        response = client.post(
            "/api/basket/", data=request_data, content_type="application/json"
        )

        lucazedes = get_object_or_404(Item, name="Lucazede")
        basket = Basket.objects.get(user=user)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(lucazedes.quantity, 90)

        self.assertEqual(basket.total, 18)

    def test_400_error_if_request_body_is_invalid(self):
        client = APIClient()
        User = get_user_model()
        user = User.objects.create_user(username="testuser", password="password")
        client.login(username="testuser", password="password")

        request_data = json.dumps(
            {
                "item_id": "s",
                "quantity": "5",
                "username": user.username,
                "password": user.password,
            }
        )

        response = client.post(
            "/api/basket/", data=request_data, content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_403_error_user_is_not_authenticated(self):
        request_data = json.dumps({"item_id": self.lucazede.id, "quantity": 1})

        response = client.post(
            "/api/basket/", data=request_data, content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_404_error_adding_item_that_does_not_exist(self):
        client = APIClient()
        User = get_user_model()
        user = User.objects.create_user(username="testuser", password="password")
        client.login(username="testuser", password="password")

        request_data = json.dumps(
            {
                "item_id": 3000,
                "quantity": 1,
                "username": user.username,
                "password": user.password,
            }
        )

        response = client.post(
            "/api/basket/", data=request_data, content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_204_remove_item_from_basket(self):
        client = APIClient()
        User = get_user_model()
        user = User.objects.create_user(username="testuser", password="password")
        client.login(username="testuser", password="password")

        basket = Basket.objects.create(user=user)
        BasketItem.objects.create(
            basket=basket,
            item=self.lucazede,
            item_quantity=self.lucazede.quantity,
            user=user,
        )

        response = client.delete(f"/api/basket/{self.lucazede.id}")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_404_error_if_passed_valid_id_but_does_not_exist(self):
        client = APIClient()
        User = get_user_model()
        user = User.objects.create_user(username="testuser", password="password")
        client.login(username="testuser", password="password")

        basket = Basket.objects.create(user=user)
        BasketItem.objects.create(
            basket=basket,
            item=self.lucazede,
            item_quantity=self.lucazede.quantity,
            user=user,
        )

        response = client.delete("/api/basket/4000")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_204_removed_item_quantity_is_added_to_stock(self):
        client = APIClient()
        User = get_user_model()
        user = User.objects.create_user(username="testuser", password="password")
        client.login(username="testuser", password="password")

        basket = Basket.objects.create(user=user)
        BasketItem.objects.create(
            basket=basket,
            item=self.lucazede,
            item_quantity=4,
            user=user,
        )

        response = client.delete(f"/api/basket/{self.lucazede.id}")

        self.lucazede.refresh_from_db()

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(self.lucazede.quantity, 104)

    def test_204_basket_total_and_quantity_are_updated_correctly_when_item_is_deleted(
        self,
    ):
        client = APIClient()
        User = get_user_model()
        user = User.objects.create_user(username="testuser", password="password")
        client.login(username="testuser", password="password")

        basket = Basket.objects.create(user=user, total=3.60, quantity=2)
        BasketItem.objects.create(
            basket=basket, item=self.lucazede, item_quantity=2, user=user
        )

        response = client.delete(f"/api/basket/{self.lucazede.id}")

        basket.refresh_from_db()
        self.lucazede.refresh_from_db()

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(self.lucazede.quantity, 102)
        self.assertEqual(basket.total, 0)
        self.assertEqual(basket.quantity, 0)

    def test_200_filter_items_by_category(self):
        request = client.get("/api/items/?category=Drink")
        items = request.data["items"]
        items_from_db = Item.objects.all().filter(category="Drink").order_by("price")
        serializer = ItemSerializer(items_from_db, many=True)

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(items, serializer.data)

    def test_404_error_if_passed_valid_category_but_does_not_exist(self):
        request = client.get("/api/items/?category=Sweets")

        self.assertEqual(request.status_code, status.HTTP_404_NOT_FOUND)

    def test_404_error_if_passed_invaild_category(self):
        request = client.get("/api/items/?category=4")

        self.assertEqual(request.status_code, status.HTTP_404_NOT_FOUND)
