# -*- coding: utf-8 -*-

from django.conf.urls import *

from account import views
from account import accounts

urlpatterns = patterns('',
    url(r'list/$', accounts.account),
    url(r'login/$', views.login),
    url(r'logined_account/$', views.logined_account),
)