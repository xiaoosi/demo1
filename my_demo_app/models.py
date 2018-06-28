from __future__ import unicode_literals
from django.db import models


# Create your models here.s
class IMG(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, null=False)
    tag = models.CharField(max_length=20, null=True)
    img = models.ImageField(upload_to=r'my_demo_app/static/media/model_gif', null=False)
    text_list_str = models.CharField(max_length=10000, null=True)

    def __unicode__(self):
        return self.name