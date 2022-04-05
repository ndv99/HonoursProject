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

    def list(self, request, *args, **kwargs):
        response = {"subscriptionToken": "This is a test. Hi there!!"}
        return_data = F1AuthSerializer(response).data
        return Response(return_data, status.HTTP_200_OK)

# @api_view()
# def f1auth_view(request):
#     return_data = {"entitlementToken": "This is a test. Hi there!!"}
#     return Response(status=200, data=return_data)
