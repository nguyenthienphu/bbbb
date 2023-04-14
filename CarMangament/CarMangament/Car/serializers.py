from rest_framework import serializers
from .models import CarName, TripName, Car, Seats, User, Comment


class CarNameSerializers(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')

    def get_image(self, CarName):
        if CarName.image:
            request = self.context.get('request')
            return request.build_absolute_uri('/static/%s' % CarName.image.name) if request else ''

    class Meta:
        model = CarName
        fields = ['id', 'carName', 'created_date', 'updated_date', 'active', 'image']


class TripNameSerializers(serializers.ModelSerializer):
    class Meta:
        model = TripName
        fields = ['id', 'tripName', 'start', 'end', 'created_date', 'updated_date', 'active',  'carName_id']


class CarSerializers(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')

    def get_image(self, Car):
        if Car.image:
            request = self.context.get('request')
            return request.build_absolute_uri('/static/%s' % Car.image.name) if request else ''

    class Meta:
        model = Car
        fields = ['id', 'number', 'created_date', 'updated_date', 'active', 'image', 'tripName_id']


class SeatsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Seats
        fields = ['id', 'number', 'created_date', 'updated_date', 'active']


class CarDetailSerializers(CarSerializers):
    seats = SeatsSerializers(many=True)

    class Meta:
        model = CarSerializers.Meta.model
        fields = CarSerializers.Meta.fields + ['description', 'startDate', 'seats']


class UserSerializers(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='avatar')

    def get_image(self, user):
        if user.avatar:
            request = self.context.get('request')
            return request.build_absolute_uri('/static/%s' % user.avatar.name) if request else ''

    def create(self, validated_data):
        data = validated_data.copy()
        u = User(**data)
        u.set_password(u.password)
        u.save()
        return u

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'avatar', 'image']
        extra_kwargs = {
            'avatar': {'write_only': True},
            'password': {'write_only': True}
        }


class CommentSerializers(serializers.ModelSerializer):
    user = UserSerializers()

    class Meta:
        model = Comment
        fields = ['id', 'comment', 'created_date', 'updated_date', 'user']

