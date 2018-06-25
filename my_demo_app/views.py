# coding: utf-8
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import os
import json
import creat_gif

# Create your views here.


def index(request):
    if request.method == 'POST':
        if not request.session.get('has_session'):
            request.session['has_session'] = True
        print(request.session.session_key)
        test_list = json.loads(request.body)
        print(test_list)
        try:
            creat_gif.create_gif_use_patchs(test_list,
                                            os.path.join("my_demo_app/static/image_file", request.session.session_key))
            return JsonResponse({"massage": "success"})
        except Exception, e:
            return JsonResponse({"massage": "flase"})
    else:
        return JsonResponse({"massage": "false"})


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

            if sessionid not in os.listdir('my_demo_app/static/image_file'):
                os.mkdir(os.path.join('my_demo_app/static/image_file', sessionid))
                os.mkdir(os.path.join('my_demo_app/static/image_file', sessionid, "patch"))

            f = open(os.path.join('my_demo_app/static/image_file', sessionid, 'gif.gif'), 'wb')
            for chunk in file_obj.chunks():
                f.write(chunk)
            f.close()

            try:
                num = creat_gif.division(os.path.join("my_demo_app/static/image_file", sessionid))
                return JsonResponse({"file_path": sessionid,
                                     "img_num": num,
                                     "massage": "success"})
            except Exception, e:
                return JsonResponse({"massage": "false"})
        else:
            return JsonResponse({"massage": "false"})
    else:
        return JsonResponse({"massage": "false"})
