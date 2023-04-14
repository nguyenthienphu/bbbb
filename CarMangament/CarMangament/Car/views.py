from rest_framework import viewsets, generics, permissions, parsers, status
from rest_framework.decorators import action
from rest_framework.views import Response
from .models import CarName, TripName, Car, Seats, User, Comment, Liked, Rating
from .serializers import CarNameSerializers, TripNameSerializers, CarSerializers, SeatsSerializers, UserSerializers, CommentSerializers, CarDetailSerializers
from .pagination import TripNamePagination
from .permission import CommentOwner


class CarNameViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = CarName.objects.all()
    serializer_class = CarNameSerializers


class TripNameViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = TripName.objects.filter(active=True)
    serializer_class = TripNameSerializers
    pagination_class = TripNamePagination

    def get_queryset(self):
        q = self.queryset
        tripName = self.request.query_params.get('tripName')
        if tripName:
            q = q.filter(tripName__icontains=tripName)

        carName_id = self.request.query_params.get('carName_id')
        if carName_id:
            q = q.filter(carName_id=carName_id)

        return q

    @action(methods=['get'], detail=True)
    def Car(self, request, pk):
        tripname = self.get_object()
        cars = tripname.car_set.filter(active=True)
        return Response(CarSerializers(cars, context={'request': request}, many=True).data)


class CarViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.ListAPIView):
    queryset = Car.objects.filter(active=True)
    serializer_class = CarDetailSerializers

    def get_permissions(self):
        if self.action in ['comments', 'like', 'raing']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['post'], detail=True)
    def comments(self, request, pk):
        c = Comment(comment=request.data['comment'], car=self.get_object(), user=request.user)
        c.save()

        return Response(CommentSerializers(c, context={'request': request}).data, status=status.HTTP_201_CREATED)

    @action(methods=['post'], detail=True)
    def like(self, request, pk):
        l, created = Liked.objects.get_or_create(user=request.user, car=self.get_object())
        if not created:
            l.like = not l.like
        l.save()

        return Response(status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True)
    def rating(self, request, pk):
        r, created = Rating.objects.get_or_create(user=request.user, car=self.get_object())
        r.rate = request.data['rate']
        r.save()

        return Response(status=status.HTTP_200_OK)


class SeatsViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Seats.objects.all()
    serializer_class = SeatsSerializers


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializers
    parser_classes = [parsers.MultiPartParser, ]

    def get_permissions(self):
        if self.action in ['current-user']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get', 'put'], detail=False, url_path='current-user')
    def current_user(self, request):
        u = request.user
        if request.method.__eq__('PUT'):
            data = request.data
            for k, v in data.items():
                setattr(u, k, v)
            u.save()

        return Response(UserSerializers(u, context={'request': request}).data)


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Comment.objects.filter(active=True)
    serializer_class = CommentSerializers
    permission_classes = [CommentOwner, ]

