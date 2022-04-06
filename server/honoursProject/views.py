from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from .models import Session
from .serializers import (SessionSerializer, F1AuthSerializer)
import requests
import json

# Create your views here.

class SessionView(viewsets.ModelViewSet):
    serializer_class = SessionSerializer
    queryset = Session.objects.all()

class F1AuthView(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        # print(request.data)

        f1auth_url = "https://api.formula1.com/v2/account/subscriber/authenticate/by-password"
        payload = {
            "Login": request.data['Login'],
            "Password": request.data['Password']
        }
        f1auth_headers = {
            "apikey": "fCUCjWrKPu9ylJwRAv8BpGLEgiAuThx7",
            "User-Agent": "RaceControl f1viewer"
        }

        f1auth_response = requests.post(url=f1auth_url, headers=f1auth_headers, data=json.dumps(payload))
        # print("F1's response:")
        # print(f1auth_response.json())

        subscriptionToken = json.loads(f1auth_response.content)["data"]["subscriptionToken"]
        response = {"subscriptionToken": subscriptionToken}
        return_data = F1AuthSerializer(response).data
        return Response(return_data, status.HTTP_200_OK)

