from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Item, User, Basket, BasketItem


class BasketInline(admin.StackedInline):
    model = Basket
    can_delete = False


class BasketItemInline(admin.StackedInline):
    model = BasketItem
    can_delete = False


class CustomUserAdmin(UserAdmin):
    model = User
    inlines = [BasketInline, BasketItemInline]


admin.site.register(Item)
admin.site.register(User, CustomUserAdmin)
