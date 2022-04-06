from rest_framework import serializers
from .models import Session

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ('id', 'join_code', 'time_delay', 'entitlementToken')

class F1AuthSerializer(serializers.Serializer):
    subscriptionToken = serializers.CharField()