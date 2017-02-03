# -*- coding: utf-8 -*-

import json
from datetime import datetime

from django.http import HttpResponseRedirect, HttpResponse
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.contrib import auth
from django.contrib.auth.models import User

from core.jsonresponse import create_response
import models as account_models

def get_account(request):
    user_id = request.GET.get('user_id', -1)
    auth_users = User.objects.filter(id=user_id)

    response = create_response(200)
    response.data = {
        'first_name': auth_users[0].first_name,
        'user_name': auth_users[0].username
    }
    return response.get_response()

def edit_account(request):
    user_id = request.POST.get('user_id', -1)
    first_name = request.POST.get('first_name', '')
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')

    User.objects.filter(id=user_id).update(
        first_name= first_name,
        username= username,
        password= password 
    )

    account_models.UserProfile.objects.filter(user_id=user_id).update(name=username)

    response = create_response(200)
    return response.get_response()