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


def get_main(request):
	"""
	获取所有信息
	"""
	print "=================="
	project_id = request.GET.get('project_id', -1)

	requirements = project_models.Requirement.objects.filter(project_id=project_id)
	requires = {}
	if requirements:
		#todo
		todo_requires = []
		todo_requirements = requirements.filter(status=0)
		if todo_requirements:
			todo_requires = [{
				'id': requirement.id,
				'status': requirement.status,
				'name': requirement.name,
				'creator': requirement.creator,
				'participant': requirement.creator if not requirement.participant else ('%s,%s')%(requirement.creator,requirement.participant),
				'created_at': '' if not requirement.created_at else requirement.created_at.strftime("%Y-%m-%d %H:%M"),
				'end_at': '-----' if not requirement.end_at else requirement.end_at.strftime("%Y-%m-%d %H:%M")
			}for requirement in todo_requirements]
		requires['todo_requires'] =  todo_requires
		# requires.append({'todo_requires': todo_requires})
		print requires,"==========ssssssss=========="
		#待开发
		will_requires = []
		will_requirements = requirements.filter(status=1)
		if will_requirements:
			will_requires = [{
				'id': requirement.id,
				'status': requirement.status,
				'name': requirement.name,
				'creator': requirement.creator,
				'participant': requirement.creator if not requirement.participant else ('%s,%s')%(requirement.creator,requirement.participant),
				'created_at': '' if not requirement.created_at else requirement.created_at.strftime("%Y-%m-%d %H:%M"),
				'end_at': '-----' if not requirement.end_at else requirement.end_at.strftime("%Y-%m-%d %H:%M")
			}for requirement in will_requirements]
		requires['will_requires'] =  will_requires
		# requires.append({'will_requires': will_requires})
		#开发
		has_requires = []
		has_requirements = requirements.filter(status=2)
		if has_requirements:
			has_requires = [{
				'id': requirement.id,
				'status': requirement.status,
				'name': requirement.name,
				'creator': requirement.creator,
				'participant': requirement.creator if not requirement.participant else ('%s,%s')%(requirement.creator,requirement.participant),
				'created_at': '' if not requirement.created_at else requirement.created_at.strftime("%Y-%m-%d %H:%M"),
				'end_at': '-----' if not requirement.end_at else requirement.end_at.strftime("%Y-%m-%d %H:%M")
			}for requirement in has_requirements]
		requires['has_requires'] = has_requires
		# requires.append({'has_requires': has_requires})

		#待测试
		will_tests = []
		will_test_requires = requirements.filter(status=3)
		if will_test_requires:
			will_tests = [{
				'id': requirement.id,
				'status': requirement.status,
				'name': requirement.name,
				'creator': requirement.creator,
				'participant': requirement.creator if not requirement.participant else ('%s,%s')%(requirement.creator,requirement.participant),
				'created_at': '' if not requirement.created_at else requirement.created_at.strftime("%Y-%m-%d %H:%M"),
				'end_at': '-----' if not requirement.end_at else requirement.end_at.strftime("%Y-%m-%d %H:%M")
			}for requirement in will_test_requires]
		requires['will_tests'] =  will_tests
		# requires.append({'will_tests': will_tests})

		#测试
		has_tests = []
		has_test_requires = requirements.filter(status=4)
		if has_test_requires:
			has_tests = [{
				'id': requirement.id,
				'status': requirement.status,
				'name': requirement.name,
				'creator': requirement.creator,
				'participant': requirement.creator if not requirement.participant else ('%s,%s')%(requirement.creator,requirement.participant),
				'created_at': '' if not requirement.created_at else requirement.created_at.strftime("%Y-%m-%d %H:%M"),
				'end_at': '-----' if not requirement.end_at else requirement.end_at.strftime("%Y-%m-%d %H:%M")
			}for requirement in has_test_requires]
		requires['has_tests'] = has_tests
		# requires.append({'has_tests': has_tests})

		#已完成
		complete_requires = []
		complete_requirements = requirements.filter(status=5)
		if complete_requirements:
			complete_requires = [{
				'id': requirement.id,
				'status': requirement.status,
				'name': requirement.name,
				'creator': requirement.creator,
				'participant': requirement.creator if not requirement.participant else ('%s,%s')%(requirement.creator,requirement.participant),
				'created_at': '' if not requirement.created_at else requirement.created_at.strftime("%Y-%m-%d %H:%M"),
				'end_at': '-----' if not requirement.end_at else requirement.end_at.strftime("%Y-%m-%d %H:%M")
			}for requirement in complete_requirements]
		requires['complete_requires'] = complete_requires
		# requires.append({'complete_requires': complete_requires})
	print requires,"+++++++++S======="
	response = create_response(200)
	response.data = {
		'requirements': json.dumps(requires)
	}
	return response.get_response()


def update_status(request):
	require_id = request.POST.get('require_id', -1)
	status = int(request.POST.get('status', 0))

	if status == 4:
		date_now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
		project_models.Requirement.objects.filter(id=require_id).update(status=status+1, end_at=date_now)
	else:
		project_models.Requirement.objects.filter(id=require_id).update(status=status+1)

	response = create_response(200)
	return response.get_response()
