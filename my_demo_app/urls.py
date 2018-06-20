from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^creat$', views.creat, name='creat'),
    url(r'^upload$', views.upload, name='upload'),
    url(r'^upload_ajax$', views.upload_ajax, name='upload_ajax'),
    url(r'^$', views.index, name='index'),
]
