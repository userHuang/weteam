# -*- coding: utf-8 -*-

from django.conf.urls import *

import accounts

urlpatterns = patterns('',
    url(r'list/$', accounts.account),
)