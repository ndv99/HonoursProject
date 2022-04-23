from rest_framework import serializers
from .models import Session, Device

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ('id', 'mode')

class SessionSerializer(serializers.ModelSerializer):

    devices = DeviceSerializer(many=True, required=False, allow_null=True)

    class Meta:
        model = Session
        fields = ('id', 'join_code', 'time_delay', 'ascendToken', 'devices')
    
    def update(self, instance, validated_data):
        print(validated_data)
        devices = validated_data.pop('devices')
        for device in devices:
            Device.objects.create(session=instance, **device)
        return super().update(instance, validated_data)

class F1AuthSerializer(serializers.Serializer):
    subscriptionToken = serializers.CharField()

class TelemetrySerializer:
    f1Session = serializers.JSONField()

class F1VideoSerializer:
    playback_url = serializers.CharField()