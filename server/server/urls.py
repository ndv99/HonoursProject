"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from honoursProject import views

router = routers.DefaultRouter()
router.register(r'sessions', views.SessionView, 'session')
router.register(r'f1auth', views.F1AuthView, 'f1auth')
router.register(r'telemetry', views.TelemetryView, 'telemetry')
router.register(r'f1video', views.F1VideoView, 'f1video')
router.register(r'pushshift', views.PushshiftView, 'pushshift')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
