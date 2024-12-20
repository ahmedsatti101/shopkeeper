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
        items = Item.objects.all()

        if q:
            items = items.filter(name__icontains=q)
        
        serializer = ItemSerializer(items, many=True)

        if not serializer.data:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({"items": serializer.data}, status=status.HTTP_200_OK)
