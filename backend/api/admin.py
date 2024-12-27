from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Item, User, Basket

class BasketInline(admin.StackedInline):
    model = Basket
    can_delete = False

class CustomUserAdmin(UserAdmin):
    model = User
    inlines = [BasketInline]


admin.site.register(Item)
admin.site.register(User, CustomUserAdmin)
