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
	# projects = project_models.Project.objects.filter(is_deleted=False)
	# project_infos = []
	# if projects:
	# 	project_infos = [{
	# 		'id': project.id,
	# 		'name': project.name,
	# 		'description': project.description,
	# 		'create_time': project.created_at.strftime("%Y-%m-%d %H:%M")
	# 	}for project in projects]

	# jsons['items'].append(('project_infos', json.dumps(project_infos)))
	c = RequestContext(request, {
		'jsons': jsons,
		'project_id': project_id,
		'first_nav': 'main'
	})
	return render_to_response('project_main/main.html', c)

def get_project_data(requirements, request, user_id2name):
	requires = []
	for requirement in requirements:
		participant_name = []
		participant_name.append(requirement.creator)
		participants =  [] if not requirement.participant else requirement.participant.split(',')
		for participant in participants:
			print participant,"======="
			print user_id2name,"======="
			participant = int(participant)
			if participant in user_id2name and participant != requirement.creator_id:
				print user_id2name[participant],"++++++++++"
				participant_name.append(user_id2name[participant])

		requires.append({
			'id': requirement.id,
			'status': requirement.status,
			'name': requirement.name,
			'remark': requirement.remark,
			'creator': requirement.creator,
			'participant_name': participant_name,
			'created_at': '' if not requirement.created_at else requirement.created_at.strftime("%Y-%m-%d %H:%M"),
			'end_at': '-----' if not requirement.end_at else requirement.end_at.strftime("%Y-%m-%d %H:%M")
		})
	return requires

def get_main(request):
	"""
	获取所有信息
	"""
	print "=================="
	project_id = request.GET.get('project_id', -1)
	requirements = project_models.Requirement.objects.filter(project_id=project_id)
	users = User.objects.all()
	user_id2name = {user.id:user.first_name for user in users}
	requires = {}
	if requirements:
		#todo
		todo_requirements = requirements.filter(status=0)
		todo_requires = get_project_data(todo_requirements, request, user_id2name)
		requires['todo_requires'] =  todo_requires

		#待开发
		will_requirements = requirements.filter(status=1)
		will_requires = get_project_data(will_requirements, request, user_id2name)
		requires['will_requires'] =  will_requires

		#开发
		has_requirements = requirements.filter(status=2)
		has_requires = get_project_data(has_requirements, request, user_id2name)
		requires['has_requires'] = has_requires

		#待测试
		will_test_requires = requirements.filter(status=3)
		will_tests = get_project_data(will_test_requires, request, user_id2name)
		requires['will_tests'] =  will_tests

		#测试
		has_test_requires = requirements.filter(status=4)
		has_tests = get_project_data(has_test_requires, request, user_id2name)
		requires['has_tests'] = has_tests

		#已完成
		complete_requirements = requirements.filter(status=5)
		complete_requires = get_project_data(complete_requirements, request, user_id2name)
		requires['complete_requires'] = complete_requires

	response = create_response(200)
	response.data = {
		'requirements': json.dumps(requires)
	}
	return response.get_response()


def update_status(request):
	user_id = request.user.id
	require_id = request.POST.get('require_id', -1)
	status = int(request.POST.get('status', 0))
	participants = project_models.Requirement.objects.get(id=require_id).participant
	
	if participants and str(user_id) not in participants:
		participants = participants + ',' + str(user_id)
	else:
		participants = str(user_id)

	if status == 4:
		date_now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
		project_models.Requirement.objects.filter(id=require_id).update(status=status+1, end_at=date_now, participant=participants)
	else:
		project_models.Requirement.objects.filter(id=require_id).update(status=status+1, participant=participants)

	response = create_response(200)
	return response.get_response()
