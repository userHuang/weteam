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
import models as project_models

@login_required
def require_list(request):
    """
    需求列表
    """
    jsons = {'items':[]}
    project_id = request.GET.get('project_id', -1)
    # projects = project_models.Project.objects.filter(is_deleted=False)
    # project_infos = []
    # if projects:
    #     project_infos = [{
    #         'id': project.id,
    #         'name': project.name,
    #         'description': project.description,
    #         'create_time': project.created_at.strftime("%Y-%m-%d %H:%M")
    #     }for project in projects]

    # jsons['items'].append(('project_infos', json.dumps(project_infos)))
    c = RequestContext(request, {
        'jsons': jsons,
        'project_id': project_id,
        'first_nav': 'require'
    })
    return render_to_response('requirement/require_list.html', c)


def get_require(request):
    """
    获取需求
    """
    project_id = request.GET.get('project_id', -1)
    requirements = project_models.Requirement.objects.filter(project_id=project_id).order_by('-id')
    requires = []
    if requirements:
        requires = [{
            'id': requirement.id,
            'name': requirement.name,
            'creator': requirement.creator,
            'participant': requirement.creator if not requirement.participant else ('%s,%s')%(requirement.creator,requirement.participant),
            'created_at': '' if not requirement.created_at else requirement.created_at.strftime("%Y-%m-%d %H:%M"),
            'end_at': '-----' if not requirement.end_at else requirement.end_at.strftime("%Y-%m-%d %H:%M")
        }for requirement in requirements]

    response = create_response(200)
    response.data = {
        'requirements': json.dumps(requires)
    }
    return response.get_response()

def add_require(request):
    """
    添加需求
    """
    name = request.POST.get('name', '')
    remark = request.POST.get('remark', '')
    project_id = request.POST.get('project_id', -1)

    try:
        acount_name = User.objects.get(id=request.user.id).first_name
        project_models.Requirement.objects.create(
            project_id = project_id,
            name= name,
            remark= remark,
            creator= acount_name
        )
    except Exception, e:
        print e
    
    response = create_response(200)
    return response.get_response()