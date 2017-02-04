# -*- coding: utf-8 -*-

from django.conf.urls import *

from account import views
from account import accounts
from account import users

urlpatterns = patterns('',
    # url(r'list/$', accounts.account),
    url(r'^login/$', views.login),
    url(r'^logout/$', views.logout),
    url(r'^logined_account/$', views.logined_account),
    url(r'^get_account/$', accounts.get_account),
    url(r'^edit_account/$', accounts.edit_account),
    url(r'^upload_image/$', accounts.upload_image),

    url(r'^addUser/$', users.addUser),
    url(r'^getUsers/$', users.getUsers),

    
)