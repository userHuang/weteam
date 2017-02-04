# -*- coding: utf-8 -*-

import json
from datetime import datetime

from django.http import HttpResponseRedirect, HttpResponse
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.contrib import auth
from django.contrib.auth.models import User
from django.conf import settings

from core.jsonresponse import create_response
import models as account_models

def get_account(request):
    user_id = request.GET.get('user_id', -1)
    auth_user = User.objects.get(id=user_id)
    account_user_profile = account_models.UserProfile.objects.get(user_id=user_id)

    response = create_response(200)
    response.data = {
        'first_name': auth_user.first_name,
        'user_name': auth_user.username,
        'user_name': auth_user.username,
        'img_url': account_user_profile.img_url
    }
    return response.get_response()

def edit_account(request):
    user_id = request.POST.get('user_id', -1)
    first_name = request.POST.get('first_name', '')
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    img_url = request.POST.get('img_url', '')
    user = User.objects.get(id=user_id)

    if password == '******':
        user.first_name = first_name
        user.username = username
        user.save()
    else:
        user.first_name = first_name
        user.username = username
        user.set_password(password)
        user.save()

    account_models.UserProfile.objects.filter(user_id=user_id).update(name=username, img_url=img_url)

    response = create_response(200)
    return response.get_response()


def upload_image(request):
    file = request.FILES.get('file',None)
    if file:
        import os,time
        second_dir = time.strftime("%Y_%m_%d_%H_%M_%S")
        saved_dir = '%s/%s/' % (settings.UPLOAD_DIR,second_dir)
        if not os.path.exists(saved_dir):
            os.makedirs(saved_dir)
        saved_path = os.path.join(saved_dir,file.name)
        try:
            saved_file = open(saved_path,'wb')
            saved_file.write(file.read())
            saved_file.close()
            response = create_response(200)
            response.data.saved_path = '/static/upload/%s/%s' % (second_dir,file.name)
        except Exception,e:
            response = create_response(500)
            response.data.errMsg = u'上传路径错误'
    else:
        response = create_response(500)
        response.data.errMsg = u'上传路径错误'
    return response.get_response()