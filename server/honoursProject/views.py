from msilib.schema import Error
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
            return Response(response, status.HTTP_503_SERVICE_UNAVAILABLE)
        

class TelemetryView(viewsets.ViewSet):

    def list(self, request, *args, **kwargs):

        headers = request.headers
        fastf1.Cache.enable_cache("server/fastf1cache")
        try:
            session = fastf1.get_session(int(headers['year']), headers['gp'], headers['identifier'])
            session.load(laps=True)

            telemetry = {}
            drivers = {}
            for driver in session.drivers:
                print(f"Getting data for driver {driver}.")
                t = session.laps.pick_driver(driver)
                print(f"Converting to dict...\n")
                telemetry[driver] = t.to_json()
                print(f"Parsing information for driver{driver}...")
                drivers[str(driver)] = session.get_driver(driver).to_json()

            for driver in drivers:
                drivers[driver] = json.loads(drivers[driver])

            for t in telemetry:
                telemetry[t] = json.loads(telemetry[t])

            data={
                "drivers": drivers,
                "telemetry": telemetry
            }

            return Response(data, status.HTTP_200_OK)
        except KeyError:
            res = {'errorMessage': "The headers were provided with incorrect keys, or not at all."}
            return Response(res, status.HTTP_400_BAD_REQUEST)

class F1VideoView(viewsets.ViewSet):

    def list(self, request, *args, **kwargs):

        headers = request.headers
        f1vid_url = "https://f1tv.formula1.com/1.0/R/ENG/BIG_SCREEN_HLS/ALL/CONTENT/PLAY?contentId="

        try:
            f1vid_headers = { 
                "ascendontoken": headers["ascendontoken"], 
                "User-Agent": "RaceControl f1viewer",
                }
            contentid = headers["contentid"]
            # print(f'Ascendon Token: {headers["ascendontoken"]}')
            # print(f"Content ID: {contentid}")
        except KeyError:
            res = {'err': 'The headers were provided with incorrect keys, or not at all'}
            return Response(res, status.HTTP_400_BAD_REQUEST)

        f1_response = requests.get(url=(f'{f1vid_url}{contentid}'), headers=f1vid_headers)

        # if f1_response.status_code
        print("F1's response:")
        print(f1_response.status_code)
        # print(type(f1_response.status_code))
        # print()
        # print(f1_response.content)

        rescode = f1_response.status_code

        if rescode == 200:
            playback_url = json.loads(f1_response.content)['resultObj']['url']
            res = {'url': playback_url}
            return Response(playback_url, status.HTTP_200_OK)
        elif rescode == 401:
            res = {'err': "Your entitlement token is incorrect, or has expired."}
            return Response(res, status.HTTP_401_UNAUTHORIZED)
        elif rescode == 400:
            res = {'err': f'A session with code  {contentid} does not exist.'}
            return Response(res, status.HTTP_400_BAD_REQUEST)
