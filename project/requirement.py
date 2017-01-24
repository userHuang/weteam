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
    users = User.objects.all()
    user_id2name = {user.id:user.first_name for user in users}
    requirements = project_models.Requirement.objects.filter(project_id=project_id, require_type=0, is_deleted=False).order_by('-id')
    requires = []
    for requirement in requirements:
        participant_name = []
        participant_name.append(requirement.creator)
        participants =  [] if not requirement.participant else requirement.participant.split(',')
        for participant in participants:
            if participant and int(participant) in user_id2name and participant != requirement.creator_id:
                participant = int(participant)
                participant_name.append(user_id2name[participant])

        requires.append({
            'id': requirement.id,
            'status': requirement.status,
            'require_type': requirement.require_type,
            'name': requirement.name,
            'remark': requirement.remark,
            'creator': requirement.creator,
            'participant_name': ','.join(participant_name),
            'created_at': '' if not requirement.created_at else requirement.created_at.strftime("%Y-%m-%d %H:%M"),
            'end_at': '-----' if not requirement.end_at else requirement.end_at.strftime("%Y-%m-%d %H:%M")
        })

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
            creator= acount_name,
            creator_id = request.user.id,
            require_type = 0
        )
    except Exception, e:
        print e
    
    response = create_response(200)
    return response.get_response()

def enter_main(request):
    """
    进入看板
    """
    user_id = request.user.id
    require_id = int(request.POST.get('require_id', -1))
    participants = project_models.Requirement.objects.get(id=require_id).participant
    creator_id = project_models.Requirement.objects.get(id=require_id).creator_id

    if user_id != creator_id:
        participant_id = user_id
    else:
        participant_id = ''
        
    date_now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    project_models.Requirement.objects.filter(id=require_id).update(status=0, participant=participant_id, updated_at=date_now)

    response = create_response(200)
    return response.get_response()

def delete_require(request):
    require_id = int(request.POST.get('require_id', -1))

    project_models.Requirement.objects.filter(id=require_id).update(is_deleted=True)

    response = create_response(200)
    return response.get_response()