from decimal import Decimal

from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render
from rest_framework import generics, status
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.decorators import (api_view, authentication_classes,
                                       permission_classes)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Basket, BasketItem, Item
from .serializers import ItemSerializer, UserSerializer

User = get_user_model()


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class ItemsView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ItemSerializer

    def get(self, request):
        q = request.GET.get("q", "")
        order_by = request.GET.get("order_by", "")
        sort_by = request.GET.get("sort_by", "")
        items = Item.objects.all().order_by("price")

        if q:
            items = items.filter(name__icontains=q)

        if order_by == "desc":
            items = items.all().order_by("-price")

        if sort_by == "quantity" and order_by == "asc":
            items = items.all().order_by("quantity")
        elif sort_by == "quantity":
            items = items.all().order_by("-quantity")

        serializer = ItemSerializer(items, many=True)

        if not serializer.data:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({"items": serializer.data}, status=status.HTTP_200_OK)


@api_view(["POST"])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def add_to_basket(request):
    item_id = request.data.get("item_id")
    quantity = request.data.get("quantity")

    if isinstance(item_id, int) is not True:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    # check if the item exists
    try:
        item = Item.objects.get(pk=item_id)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # create basket for user if doesn't exist
    # otherwise get the basket
    try:
        basket = Basket.objects.get(user=request.user)
    except Basket.DoesNotExist:
        basket = Basket.objects.create(user=request.user)
        basket.save()

    # add item to basket if doesn't exist
    # otherwise increment its quantity & price
    try:
        basket_item = BasketItem.objects.get(item=item, basket=basket)
        basket_item.item_quantity += quantity
        basket_item.save()
    except BasketItem.DoesNotExist:
        basket_item = BasketItem.objects.create(
            basket=basket,
            item=item,
            item_quantity=quantity,
            user=request.user,
        )

    basket_items = BasketItem.objects.filter(basket=basket)
    total_price = sum(
        item.item.price.amount * item.item_quantity for item in basket_items
    )

    basket.total = total_price
    basket.quantity = basket_items.count()
    basket.save()

    Item.decrease_stock(item_id=item_id, quantity=quantity)
    return Response(status=status.HTTP_201_CREATED)
