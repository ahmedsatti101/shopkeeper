from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from .serializers import UserSerializer, ItemSerializer, BasketSerializer
from .models import Item, Basket, BasketItem
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.shortcuts import get_object_or_404

User = get_user_model()


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class ItemsView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ItemSerializer

    def get(self, request):
        q = request.GET.get('q', '')
        order_by = request.GET.get('order_by', '')
        sort_by = request.GET.get('sort_by', '')
        items = Item.objects.all().order_by('price')

        if q:
            items = items.filter(name__icontains=q)

        if order_by == 'desc':
            items = items.all().order_by('-price')

        if sort_by == 'quantity' and order_by == 'asc':
            items = items.all().order_by('quantity')
        elif sort_by == 'quantity':
            items = items.all().order_by('-quantity')
        
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

    try:
        item = get_object_or_404(Item, pk=item_id)
        basket_obj, _ = Basket.objects.get_or_create(user=request.user, quantity=quantity)
        BasketItem.objects.create(basket=basket_obj, item=item, item_quantity=quantity, user=request.user)
    except ValueError:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    return Response(status=status.HTTP_201_CREATED)
