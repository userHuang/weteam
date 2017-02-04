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
# from account import models as account_models
import models as project_models

@login_required
def members(request):
	"""
	成员列表
	"""
	jsons = {'items':[]}
	project_id = request.GET.get('project_id', -1)
	projects = project_models.Project.objects.filter(is_deleted=False)
	members = []
	if projects:
		members = [{
			'id': project.id,
			'name': project.name,
			'description': project.description,
			'create_time': project.created_at.strftime("%Y-%m-%d %H:%M")
		}for project in projects]

	jsons['items'].append(('members', json.dumps(members)))
	
	c = RequestContext(request, {
		'jsons': jsons,
		'project_id': project_id,
		'first_nav': 'member',
		'user_id': request.user.id,
	})
	return render_to_response('member/members.html', c)