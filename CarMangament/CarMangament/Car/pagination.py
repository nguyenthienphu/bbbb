from rest_framework import pagination


class TripNamePagination(pagination.PageNumberPagination):
    page_size = 3

