from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Item, User


class CustomUserAdmin(UserAdmin):
    model = User
    fieldsets = UserAdmin.fieldsets + (  # Add custom fields to the admin interface
        (None, {'fields': ('basket', 'avatar')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (  # Add custom fields to the create user form
        (None, {'fields': ('basket', 'avatar')}),
    )

admin.site.register(Item)
admin.site.register(User, CustomUserAdmin)
