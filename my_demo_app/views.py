# coding: utf-8
from django.shortcuts import render
from django.http import JsonResponse
from django.core.paginator import Paginator
import os
import json
import creat_gif
import shutil
from models import IMG

# Create your views here.


def gif(request):
    if request.method == 'POST':
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
    try:
        text_list_json = request.POST['text_list_json']
    except:
        text_list_json = ''
    content = {"file_path": request.POST['file_path'].encode('utf-8'),
               "img_num": int(request.POST['img_num']),
               "text_list_json": text_list_json,
               }
    print content
    return render(request, 'creat/creat.html', content)


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
                                     "text_list_json": '',
                                     "massage": "success"})
            except Exception, e:
                return JsonResponse({"massage": "false"})
        else:
            return JsonResponse({"massage": "false"})
    else:
        return JsonResponse({"massage": "false"})


def index(request):
    return render(request, 'index.html')


def get_pages(totalpage=1,current_page=1):
    WEB_DISPLAY_PAGE = 5
    front_offset = int(WEB_DISPLAY_PAGE / 2)
    if WEB_DISPLAY_PAGE % 2 == 1:
        behind_offset=front_offset
    else:
        behind_offset=front_offset -1

    if totalpage < WEB_DISPLAY_PAGE:
        return list(range(1,totalpage+1))
    elif current_page<=front_offset:
        return list(range(1,WEB_DISPLAY_PAGE+1))
    elif current_page>=totalpage-behind_offset:
        start_page=totalpage-WEB_DISPLAY_PAGE+1
        return list(range(start_page,totalpage+1))
    else:
        start_page=current_page-front_offset
        end_page=current_page+behind_offset
        return list(range(start_page,end_page+1))


def template(request):
    imgs = IMG.objects.all()
    for img in imgs:
        str = img.img.url
        img.img = os.path.split(str)[1]
        print img.img
    paginator_obj = Paginator(imgs, 8)
    request_page_num = request.GET.get('page', 1)
    page_obj = paginator_obj.page(request_page_num)
    total_page_number = paginator_obj.num_pages
    print(total_page_number)
    page_list = get_pages(int(total_page_number), int(request_page_num))
    return render(request, 'template.html', {'page_obj': page_obj, 'page_list': page_list})


def model_click(request):
    id = int(request.body)
    model = IMG.objects.get(id=id)
    if request.method == 'POST':
        if not request.session.get('has_session'):
            request.session['has_session'] = True
        request.session.save()
        sessionid = request.session.session_key
        print(sessionid)
        if sessionid not in os.listdir('my_demo_app/static/image_file'):
            os.mkdir(os.path.join('my_demo_app/static/image_file', sessionid))
            os.mkdir(os.path.join('my_demo_app/static/image_file', sessionid, "patch"))
        shutil.copy(model.img.path, os.path.join('my_demo_app/static/image_file', sessionid, 'gif.gif'))
        num = creat_gif.division(os.path.join("my_demo_app/static/image_file", sessionid))
        data = {"file_path": sessionid,
                "img_num": num,
                "text_list_json": model.text_list_str,
                }
        return JsonResponse(data)
