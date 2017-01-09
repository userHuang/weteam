    # -*- coding: utf-8 -*-

import json
from datetime import datetime

from django.http import HttpResponseRedirect, HttpResponse
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.contrib import auth
from django.contrib.auth.models import User
from account.models import *

def login(request):
    auth.logout(request)
    c = RequestContext(request, {})
    return render_to_response('account/login.html', c)

def logout(request):
    auth.logout(request)
    c = RequestContext(request, {})
    return render_to_response('account/login.html', c)

def logined_account(request):
    username = request.POST.get('username', 'empty_username')
    password = request.POST.get('password', 'empty_password')
    user = auth.authenticate(username=username, password=password)

    if user:
        auth.login(request, user)
        user_id = user.id
        user_profile = UserProfile.objects.filter(user_id=user_id)
        return HttpResponseRedirect('/project/')
    else:
        return HttpResponseRedirect('/account/login/')