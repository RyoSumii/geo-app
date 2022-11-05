from django.contrib import admin
from .models import Listing
from .forms import ListingsForm
# Register your models here.

class ListingAdmin(admin.ModelAdmin):
    form = ListingsForm

admin.site.register(Listing, ListingAdmin)
