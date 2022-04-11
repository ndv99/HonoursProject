from rest_framework import serializers
from .models import Session

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ('id', 'join_code', 'time_delay', 'ascendToken')

class F1AuthSerializer(serializers.Serializer):
    subscriptionToken = serializers.CharField()

class TelemetrySerializer:
    f1Session = serializers.JSONField()

class F1VideoSerializer:
    playback_url = serializers.CharField()