#coding: utf-8
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
import test
from PIL import Image
#import moviepy.editor as mpy

# Create your views here.


def index(request):
    if not request.session.get('has_session'):
        request.session['has_session'] = True

    request.session['username'] = 'admin'
    print(request.session.session_key)
    test_list = json.loads(request.body)
    print(test_list)
    test.create_text_clip_use_patchs(test_list, 'image_file'+ request.session.session_key)

    response = HttpResponse("{data:'hello world!'}")
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

        sessionid = request.session.session_key
        print(sessionid)
        import os
        if not sessionid in os.listdir('image_file'):
            os.mkdir(os.path.join('image_file', sessionid))
        file_obj = request.FILES.get('file')
        if os.path.splitext(file_obj.name)[1] == '.gif':
            f = open(os.path.join('image_file', sessionid, 'gif.gif'), 'wb')
            for chunk in file_obj.chunks():
                f.write(chunk)
            f.close()
            return HttpResponse('OK')
        return HttpResponse('FALSE')