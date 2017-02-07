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

@login_required
def users(request):
    """
    成员列表
    """
    # jsons = {'items':[]}
    # user_profiles = account_models.UserProfile.objects.filter(status=True)
    # auth_users = User.objects.all()
    # user_id2name = {auth_user.id:auth_user.first_name for auth_user in auth_users}
    # print user_profiles,"++++++++"
    # users = []
    # if user_profiles:
    #     users = [{
    #         'name': '' if user_profile.user_id not in user_id2name else user_id2name[user_profile.user_id],
    #         'account': user_profile.name
    #     }for user_profile in user_profiles]

    # print users,"========="
    # jsons['items'].append(('users', json.dumps(users)))
    c = RequestContext(request, {
        # 'jsons': jsons,
        'first_nav': 'user',
        'user_id': request.user.id
    })
    return render_to_response('user/users.html', c)

def getUsers(request):
    user_profiles = account_models.UserProfile.objects.filter(status=True)
    auth_users = User.objects.all()
    user_id2name = {auth_user.id:auth_user.first_name for auth_user in auth_users}

    users = []
    if user_profiles:
        users = [{
            'name': '' if user_profile.user_id not in user_id2name else user_id2name[user_profile.user_id],
            'account': user_profile.name
        }for user_profile in user_profiles]

    response = create_response(200)
    response.data = {
        'users': json.dumps(users)
    }
    return response.get_response()

def addUser(request):
    """
    添加成员
    """
    user_name = request.POST.get('user_name', '')
    account = request.POST.get('account', '')
    role = request.POST.get('role', 1)

    try:
        user = User.objects.create_user(account, account+'@qq.com', account)
        user.first_name = user_name
        user.save()
        account_models.UserProfile.objects.create(
            name= account,
            user_id= user.id,
            role= role
        )
        response = create_response(200)
    except Exception, e:
        print e
        response = create_response(500)
    
    return response.get_response()