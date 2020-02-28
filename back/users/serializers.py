from rest_framework import serializers
from .models import User

# Class user serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'password', 'email', 'first_name',
                  'last_name', 'is_active', 'cellphone', 'position']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
