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
def project_list(request):
	"""
	项目列表
	"""
	jsons = {'items':[]}
	belongs = account_models.UserProfile.objects.get(user_id=request.user.id, status=1).belongs
	if belongs:
		belongs = belongs.split(',')
	else:
		belongs = []
	projects = project_models.Project.objects.filter(id__in=belongs, is_deleted=False)
	project_infos = []
	if projects:
		project_infos = [{
			'id': project.id,
			'name': project.name,
			'description': project.description,
			'create_time': project.created_at.strftime("%Y-%m-%d %H:%M")
		}for project in projects]

	jsons['items'].append(('project_infos', json.dumps(project_infos)))
	c = RequestContext(request, {
		'jsons': jsons,
		'first_nav': 'project',
		'user_id': request.user.id
	})
	return render_to_response('project/new_project.html', c)

def new_project(request):
	"""
	新建项目
	"""
	project_name = request.POST.get('project_name', '')
	project_description = request.POST.get('project_description', '')
	try:
		project_models.Project.objects.create(
			name= project_name,
			description = project_description
		)
	except Exception, e:
		print e
	
	response = create_response(200)
	return response.get_response()