from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from rest_framework.settings import api_settings
from .models import Session
from .serializers import (SessionSerializer, F1AuthSerializer)
import requests
import json
import fastf1

# Create your views here.

class SessionView(viewsets.ModelViewSet):
    serializer_class = SessionSerializer
    queryset = Session.objects.all()

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(self, serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status.HTTP_200_OK, headers=headers)


    # def perform_create(self, serializer):
    #     serializer.save()
    
    # def get_success_headers(self, data):
    #     try:
    #         return {'Location': str(data[api_settings.URL_FIELD_NAME])}
    #     except (TypeError, KeyError):
    #         return {}

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
        print("F1's response:")
        print(f1auth_response.status_code)

        try:
            subscriptionToken = json.loads(f1auth_response.content)["data"]["subscriptionToken"]
            response = {"subscriptionToken": subscriptionToken}
            return_data = F1AuthSerializer(response).data
            return Response(return_data, status.HTTP_200_OK)
        except json.decoder.JSONDecodeError:
            response = {'errorReason': "F1 is currently rejecting requests since it thinks I am a bot."}
            return Response(json.dumps(response), status.HTTP_503_SERVICE_UNAVAILABLE)
        

class TelemetryView(viewsets.ViewSet):

    def list(self, request, *args, **kwargs):
        res = {'testResponse': "This is a test response. If you see this, it worked!"}
        return Response(json.dumps(res), status.HTTP_200_OK)