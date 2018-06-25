from django.db import models


# Create your models here.
class GifModel(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, null=False)
    tag = models.CharField(max_length=500)
    file_path = models.CharField(max_length=100, null=False)
    text_list = models.CharField(max_length=500)
    add_time = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.title
