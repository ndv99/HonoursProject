from django.shortcuts import render
from rest_framework import viewsets
from .serializers import SessionSerializer
from .models import Session

# Create your views here.

class SessionView(viewsets.ModelViewSet):
    serializer_class = SessionSerializer
    queryset = Session.objects.all()

