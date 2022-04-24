from rest_framework import serializers
from .models import Session, Device

class DeviceSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = Device
        fields = ('id', 'mode')

class SessionSerializer(serializers.ModelSerializer):

    devices = DeviceSerializer(many=True, required=False, allow_null=True)

    class Meta:
        model = Session
        fields = ('id', 'join_code', 'time_delay', 'ascendToken', 'devices')

    def create(self, validated_data):
        session = Session.objects.create(**validated_data)
        return session
    
    def update(self, instance, validated_data):
        # print(validated_data)
        devices = validated_data.get('devices')
        for device in devices:
            device_id = device.get('id', None)
            if device_id:
                session_device = Device.objects.get(id=device_id, session=instance)
                session_device.mode = device.get('mode', session_device.mode)
                session_device.save()
            else:
                Device.objects.create(session=instance, **device)
            
        return instance

class F1AuthSerializer(serializers.Serializer):
    subscriptionToken = serializers.CharField()

class TelemetrySerializer:
    f1Session = serializers.JSONField()

class F1VideoSerializer:
    playback_url = serializers.CharField()