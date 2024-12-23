from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, ItemSerializer
from .models import Item


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
