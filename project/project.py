# -*- coding: utf-8 -*-

import json
import requests
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
	account_user_profile = account_models.UserProfile.objects.get(user_id=request.user.id, status=True)
	belongs = account_user_profile.belongs
	role = account_user_profile.role

	if belongs:
		belongs = belongs.split(',')
	else:
		belongs = []

	if role == 0:
		projects = project_models.Project.objects.filter(is_deleted=False)
	else:
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

	# try:
	# 	# DingTalk配置信息
	# 	CORP_ID = "ding493ad98a4ba4816c35c2f4657eb6378f"
	# 	CORP_SECRET = "BCjHU-kez9jRc9BPn5dFBSEMR9yqGJE8dWb7Pq5k0vnc8ePFI4Fgk92x_y18j9el"
	# 	agent_id = "75747281"
	# 	user_id = 'manager6658'

	# 	ROOT_URL = "https://oapi.dingtalk.com"
	# 	headers = {
	# 		"Content-Type": "application/json",
	# 		"Accept": "*/*",
	# 		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36"
	# 	}
	# 	ssl_verified = False
	# 	res = requests.get("%s/gettoken?corpid=%s&corpsecret=%s" % (ROOT_URL, CORP_ID, CORP_SECRET), verify=ssl_verified)
	# 	data = json.loads(res.content)
	# 	print data,data['errmsg'].encode('gbk'),"====ss====sss======"
	# 	access_tocken = data['access_token']
	# 	print access_tocken,"----access_tocken-------"

	# 	message = {
	# 		"touser": user_id,
	# 		"agentid": agent_id,
	# 		"msgtype":"oa",
	# 		"oa":{
	# 			"message_url": "http://127.0.0.1:9000/project/",
	# 	        "head": {
	# 	            "bgcolor": "",
	# 	            "text": "sadd"
	# 	        },
	# 	        "body": {
	# 	            "title": "",
	# 	            "form": [
	# 	                {
	# 	                    "key": "姓名:",
	# 	                    "value": "张三sad"
	# 	                }
	# 	            ],
	# 	            "image": "",
	# 	            "author": "huangjian"
	# 	        }
	# 		}
	# 	}
	# 	# data = self.api_post("/message/send", message)
	# 	url_send = "%s%s?access_token=%s" % (ROOT_URL, "/message/send", access_tocken)
	# 	res_send = requests.post(url_send, headers=headers, verify=ssl_verified, json=message)
	# 	data_send = json.loads(res_send.content)
	# 	print data_send,"------data_send-------"
	# except Exception, e:
	# 	print e,"====error======"
	print project_infos,"======project_infos======"
	c = RequestContext(request, {
		'jsons': jsons,
		'first_nav': 'project',
		'role': role,
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