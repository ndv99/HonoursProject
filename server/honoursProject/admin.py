from django.contrib import admin
from .models import Session

class SessionAdmin(admin.ModelAdmin):
    list_display = ('join_code', 'time_delay', 'ascendToken')

# Register your models here.

admin.site.register(Session, SessionAdmin)


