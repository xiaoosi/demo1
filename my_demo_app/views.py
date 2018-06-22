#coding: utf-8
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import os
import json
import creat_gif
from PIL import Image
#import moviepy.editor as mpy

# Create your views here.


def index(request):
    if not request.session.get('has_session'):
        request.session['has_session'] = True
    print(request.session.session_key)
    test_list = json.loads(request.body)
    print(test_list)
    creat_gif.create_text_clip_use_patchs(test_list,
                                          os.path.join("my_demo_app/static/image_file", request.session.session_key))
    response2 = JsonResponse({"name": "xiaosi"})
    return response2


def creat(request):
    return render(request, 'creat/creat.html')


def upload(request):
    return render(request, 'upload/upload.html')


def upload_ajax(request):
    if request.method == 'POST':
        if not request.session.get('has_session'):
            request.session['has_session'] = True

        request.session.save()
        sessionid = request.session.session_key
        print(sessionid)
        file_obj = request.FILES.get('file')
        if os.path.splitext(file_obj.name)[1] == '.gif':
            if not sessionid in os.listdir('my_demo_app/static/image_file'):
                os.mkdir(os.path.join('my_demo_app/static/image_file', sessionid))
                os.mkdir(os.path.join('my_demo_app/static/image_file', sessionid, "patch"))
            f = open(os.path.join('my_demo_app/static/image_file', sessionid, 'gif.gif'), 'wb')
            for chunk in file_obj.chunks():
                f.write(chunk)
            f.close()
            num = creat_gif.division(os.path.join("my_demo_app/static/image_file", sessionid))
            return JsonResponse({"file_path": sessionid,
                                 "img_num": num})
        return HttpResponse('FALSE')