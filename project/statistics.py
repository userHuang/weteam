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
# from project import models as project_models
from account import models as account_models
import models as project_models

@login_required
def statistics(request):
    """
    需求、bug统计
    """

    project_id = request.GET.get('project_id', -1)

    c = RequestContext(request, {
        'project_id': project_id,
        'first_nav': 'statistics',
        'user_id': request.user.id,
    })
    return render_to_response('statistics/statistics.html', c)

def get_statistics(request):
    project_id = request.GET.get('project_id', -1)
    user_profiles = account_models.UserProfile.objects.filter(belongs__icontains=project_id, status=True).order_by('updated_at')
    user_ids = [user_profile.user_id for user_profile in user_profiles]
    auth_users = User.objects.filter(id__in=user_ids)
    user_id2name = {auth_user.id:auth_user.first_name for auth_user in auth_users}

    project_requirements = project_models.Requirement.objects.filter(project_id=project_id)
    # user_id2requirements = {requirement.creator_id:requirement for requirement in project_requirements}

    user_id2requires = {}
    user_id2bugs = {}
    for requirement in project_requirements.filter(require_type = 0):
        belong_id = requirement.belong_id
        if belong_id not in user_id2requires:
            user_id2requires[belong_id] = [{'name': requirement.name}]
        else:
            user_id2requires[belong_id].append({'name': requirement.name})

    for requirement in project_requirements.filter(require_type = 1):
        belong_id = requirement.belong_id
        if belong_id not in user_id2bugs:
            user_id2bugs[belong_id] = [{'name': requirement.name}]
        else:
            user_id2bugs[belong_id].append({'name': requirement.name})

    require_numbers = []
    bug_numbers = []
    users = []
    for user_profile in user_profiles:
        user_id = user_profile.user_id
        print user_ids,"=======user_id========"
        if user_id in user_ids:
            name = user_id2name[user_id]
            users.append(name)
            #需求数
            require_numbers.append({
                'name': name,
                'value': 0 if user_id not in user_id2requires else len(user_id2requires[user_id]),
            })
            #bug数
            bug_numbers.append({
                'name': name,
                'value': 0 if user_id not in user_id2bugs else len(user_id2bugs[user_id])
            })

    statistics = {
        'require_numbers': require_numbers,
        'bug_numbers': bug_numbers,
        'users': users
    }
    response = create_response(200)
    response.data = {
        'statistics': statistics
    }
    return response.get_response()