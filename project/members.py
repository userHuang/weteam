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
def members(request):
	"""
	项目成员
	"""

	project_id = request.GET.get('project_id', -1)

	c = RequestContext(request, {
		'project_id': project_id,
		'first_nav': 'member',
		'user_id': request.user.id,
	})
	return render_to_response('member/members.html', c)

def get_members(request):
	"""
	获取成员
	"""
	project_id = request.GET.get('project_id', -1)
	role = account_models.UserProfile.objects.get(user_id=request.user.id, status=True).role
	user_profiles = account_models.UserProfile.objects.filter(belongs__icontains=project_id, status=True).order_by('updated_at')
	user_ids = [user_profile.user_id for user_profile in user_profiles]
	auth_users = User.objects.filter(id__in=user_ids)
	user_id2name = {auth_user.id:auth_user.first_name for auth_user in auth_users}

	users = []
	if user_profiles:
		users = [{
			'user_id': user_profile.user_id,
			'name': user_id2name[user_profile.user_id],
			'account': user_profile.name,
			'img_url': user_profile.img_url if user_profile.img_url else '/static/img/default_user.jpg'
		}for user_profile in user_profiles]

	all_users = []
	all_user_profiles = account_models.UserProfile.objects.filter(status=True)
	all_user_ids = [all_user_profile.user_id for all_user_profile in all_user_profiles]
	for user in User.objects.filter(id__in=all_user_ids).exclude(id__in=user_ids):
		all_users.append({
			'user_id': user.id,
			'username': user.username,
			'first_name': user.first_name
		})

	response = create_response(200)
	response.data = {
		'role': role,
		'users': json.dumps(users),
		'all_users': json.dumps(all_users)
	}
	return response.get_response()

def add_member(request):
	"""
	添加成员
	"""
	user_id = int(request.POST.get('user_id', -1))
	project_id = request.POST.get('project_id', -1)
	try:
		date_now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
		user_profile = account_models.UserProfile.objects.get(user_id=user_id)
		belongs = user_profile.belongs
		if belongs:
			user_profile.belongs = belongs + ',' + project_id
		else:
			user_profile.belongs = str(project_id)
		user_profile.updated_at = date_now
		user_profile.save()
		response = create_response(200)
	except Exception, e:
		print e
		response = create_response(500)
	
	return response.get_response()

def delete_member(request):
	"""
	删除成员
	"""
	user_id = int(request.POST.get('user_id', -1))
	project_id = request.POST.get('project_id', -1)
	print user_id,"-------"
	response = create_response(200)
	try:
		belongs = account_models.UserProfile.objects.get(user_id=user_id).belongs
		belongs = belongs.split(",")
		belong_ids = filter(lambda x: x != project_id, belongs)
		print belong_ids,"=====belong_ids===="
		belong_ids = ','.join(belong_ids)
		account_models.UserProfile.objects.filter(user_id=user_id).update(belongs = belong_ids)
	except Exception, e:
		response = create_response(500)

	return response.get_response()