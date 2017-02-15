# -*- coding: utf-8 -*-

from django.conf.urls import *

import ding_approval, approval_detail

urlpatterns = patterns('',
    url(r'^$', ding_approval.approval_list),
    url(r'^approval_list/', ding_approval.approval_list),
    url(r'^add_approval/', ding_approval.add_approval),
    url(r'^get_approval/', ding_approval.get_approval),

    url(r'^approval_detail', approval_detail.approval_detail),
    url(r'^adopt', approval_detail.adopt),
    url(r'^reject', approval_detail.reject)
)