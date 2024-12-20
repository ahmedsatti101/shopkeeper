from django.urls import path
from . import views

urlpatterns = [
    path("items/", views.ItemsView.as_view(), name="items")
]
