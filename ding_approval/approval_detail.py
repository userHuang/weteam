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
import models as ding_approval_models

status2name = {
	0: u'申请中',
	1: u'已通过',
	2: u'已驳回'
}
	
@login_required
def approval_detail(request):
	"""
	列表详情
	"""
	jsons = {'items':[]}
	approval_id = request.GET.get('id',-1)
	account_user_profile = account_models.UserProfile.objects.get(user_id=request.user.id, status=True)
	role = account_user_profile.role
	users = User.objects.all()
	user_id2name = {user.id:user.first_name for user in users}

	ding_approvals = ding_approval_models.DingApproval.objects.filter(id=approval_id, is_deleted=False)
	approval_details = []
	if ding_approvals:
	  approval_details = [{
			'id': ding_approval.id,
			'money': '%.2f' % ding_approval.money,
			'remark': ding_approval.remark,
            'status': ding_approval.status,
			'statusName': status2name[ding_approval.status],
			'creator': user_id2name[ding_approval.approval_id],
			'created_at': '' if not ding_approval.created_at else ding_approval.created_at.strftime("%Y-%m-%d %H:%M")
	  }for ding_approval in ding_approvals]

	jsons['items'].append(('approval_details', json.dumps(approval_details)))
	
	c = RequestContext(request, {
		'jsons': jsons,
		'first_nav': 'approval',
		'role': role,
		'user_id': request.user.id
	})
	return render_to_response('approval_detail/approval_detail.html', c)

def adopt(request):
	approval_id = int(request.POST.get('approval_id',-1))
	try:
		print approval_id,"++++++++ssss+++++++"
		ding_approval_models.DingApproval.objects.filter(id=approval_id, is_deleted=False).update(
			status = 1
		)
		response = create_response(200)
	except Exception, e:
		raise e
		response = create_response(500)
	return response.get_response()

def reject(request):
	approval_id = int(request.POST.get('approval_id',-1))
	try:
		ding_approval_models.DingApproval.objects.filter(id=approval_id, is_deleted=False).update(
			status = 2
		)
		response = create_response(200)
	except Exception, e:
		raise e
		response = create_response(500)
	
	return response.get_response()