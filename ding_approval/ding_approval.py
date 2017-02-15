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
def approval_list(request):
    """
    项目列表
    """
    jsons = {'items':[]}
    account_user_profile = account_models.UserProfile.objects.get(user_id=request.user.id, status=True)
    role = account_user_profile.role

    c = RequestContext(request, {
        'first_nav': 'approval',
        'role': role,
        'user_id': request.user.id
    })
    return render_to_response('ding_approval/approval_list.html', c)

def get_approval(request):
    """
    获取申请列表
    """
    users = User.objects.all()
    user_id2name = {user.id:user.first_name for user in users}
    ding_approvals = ding_approval_models.DingApproval.objects.filter(is_deleted=False).order_by('-id')

    approvals = []
    for ding_approval in ding_approvals:
        name = user_id2name[ding_approval.approval_id]
        approvals.append({
            'id': ding_approval.id,
            'money': '%.2f' % ding_approval.money,
            'remark': ding_approval.remark,
            'status': ding_approval.status,
            'statusName': status2name[ding_approval.status],
            'creator': name,
            'created_at': '' if not ding_approval.created_at else ding_approval.created_at.strftime("%Y-%m-%d %H:%M")
        })
    response = create_response(200)
    response.data = {
        'approvals': json.dumps(approvals)
    }
    return response.get_response()

def add_approval(request):
    """
    发起申请
    """
    money = request.POST.get('money', 0)
    remark = request.POST.get('remark', '')

    try:
        ding_approval_models.DingApproval.objects.create(
            money = money,
            approval_id= request.user.id,
            remark= remark,
            status= 0
        )

        ding_approvals = ding_approval_models.DingApproval.objects.filter(approval_id=request.user.id,is_deleted=False,status=0).order_by('-id')
        print ding_approvals[0].id,"------ding_approval_id------"
        # DingTalk配置信息
        ROOT_URL = "https://oapi.dingtalk.com"
        CORP_ID = "ding493ad98a4ba4816c35c2f4657eb6378f"
        CORP_SECRET = "BCjHU-kez9jRc9BPn5dFBSEMR9yqGJE8dWb7Pq5k0vnc8ePFI4Fgk92x_y18j9el"
        agent_id = "75747281"
        touser_id = 'manager6658|0160305869-194382207|0329140559706077'
        ssl_verified = False

        headers = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36"
        }

        res = requests.get("%s/gettoken?corpid=%s&corpsecret=%s" % (ROOT_URL, CORP_ID, CORP_SECRET), verify=ssl_verified)
        data = json.loads(res.content)
        access_tocken = data['access_token']


        name = User.objects.get(id=request.user.id).first_name
        message_url = "http://192.168.0.128:9000/ding_approval/approval_detail?id=%s" %ding_approvals[0].id

        # ding_money = (%s,%s) %(money,'元')
        message = {
            "touser": touser_id,
            "agentid": agent_id,
            "msgtype": "oa",
            "oa": {
                "message_url": message_url,
                "head": {
                    "bgcolor": "",
                    "text": ""
                },
                "body": {
                    "title": "",
                    "form": [
                        {
                            "key": "金额(元):",
                            "value": money
                        }
                    ],
                    # "rich": {
                    #     "num": money,
                    #     "unit": "元"
                    # },
                    "content": remark,
                    "author": ""
                }
            }
        }
        url_send = "%s%s?access_token=%s" % (ROOT_URL, "/message/send", access_tocken)
        res_send = requests.post(url_send, headers=headers, verify=ssl_verified, json=message)
        data_send = json.loads(res_send.content)

    except Exception, e:
        print e,"====error======"
    
    response = create_response(200)
    return response.get_response()