# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-06-28 05:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_demo_app', '0002_auto_20180628_0122'),
    ]

    operations = [
        migrations.AlterField(
            model_name='img',
            name='img',
            field=models.ImageField(upload_to='my_demo_app/static/media/model_gif'),
        ),
        migrations.AlterField(
            model_name='img',
            name='text_list_str',
            field=models.CharField(max_length=10000, null=True),
        ),
    ]
