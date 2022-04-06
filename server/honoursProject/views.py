from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from .models import Session
from .serializers import (SessionSerializer, F1AuthSerializer)

# Create your views here.

class SessionView(viewsets.ModelViewSet):
    serializer_class = SessionSerializer
    queryset = Session.objects.all()

class F1AuthView(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        print(request.data)
        response = {"subscriptionToken": "This is a test. Hi there!!"}
        return_data = F1AuthSerializer(response).data
        return Response(return_data, status.HTTP_200_OK)

