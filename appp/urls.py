from django.urls import path
from . import views

urlpatterns = [
    path("home/", views.home, name='home'),
    path('', views.form, name='form'),
    path('get-leads/', views.get_leads, name='get-leads'),
    path('send-email/<str:name>/<str:company>/<str:mail>', views.send_message, name='send-email')
]