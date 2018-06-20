from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
from PIL import Image
#import moviepy.editor as mpy

# Create your views here.


def index(request):
    if not request.session.get('has_session'):
        request.session['has_session'] = True
    #print(json.loads(request.body.decode()))
    request.session['username'] = 'admin'
    response = HttpResponse("{data:'hello world!'}")
    response2 = JsonResponse({"name": "xiaosi"})
    print request.session.session_key
    return response2


def creat(request):
    return render(request, 'creat/creat.html')


def upload(request):
    return render(request, 'upload/upload.html')


def upload_ajax(request):
    if request.method == 'POST':
        file_obj = request.FILES.get('file')
        for chunks in file_obj.chunks():
            print(chunks)
            print('/n')
        print(file_obj, type(file_obj))
        return HttpResponse('OK')