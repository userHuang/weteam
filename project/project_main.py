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
def main(request):
	"""
	项目详情列表
	"""
	jsons = {'items':[]}
	project_id = request.GET.get('project_id', -1)
	print project_id,"======="
	projects = project_models.Project.objects.filter(is_deleted=False)
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
		'project_id': project_id,
		'first_nav': 'main'
	})
	return render_to_response('project_main/main.html', c)