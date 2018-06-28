from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^creat$', views.creat, name='creat'),
    url(r'^upload$', views.upload, name='upload'),
    url(r'^upload_ajax$', views.upload_ajax, name='upload_ajax'),
    url(r'^gif$', views.gif, name='gif'),
    url(r'^template$', views.template, name='template'),
    url(r'^$', views.index, name='index'),
    url(r'^model_click$', views.model_click, name='model_click')
]
