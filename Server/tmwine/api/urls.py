from django.urls import path
from . import views

urlpatterns = [
    path('label/', views.labelRecommendation, name='label'),
    #path('review/', views.ReviewRecommendations.as_view()),
]