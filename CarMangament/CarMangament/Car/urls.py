from django.urls import path, include
from rest_framework import routers
from . import views

r = routers.DefaultRouter()
r.register('CarName', views.CarNameViewSet, basename='CarName')
r.register('TripName', views.TripNameViewSet, basename='TripName')
r.register('Car', views.CarViewSet, basename='Car')
r.register('Seats', views.SeatsViewSet, basename='Seats')
r.register('User', views.UserViewSet, basename='User')
r.register('Comment', views.CommentViewSet, basename='Comment')

urlpatterns = [
    path('', include(r.urls)),
]