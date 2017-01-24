# -*- coding: utf-8 -*-

from django.conf.urls import *

import project
import project_main
import members
import requirement
import bug

urlpatterns = patterns('',
    url(r'^$', project.project_list),
    url(r'new_project/', project.new_project),

    #成员列表
    url(r'^members/', members.members),

    #看板
    url(r'^main/', project_main.main),
    url(r'^get_require_details/', project_main.get_main),
    url(r'^update_status/', project_main.update_status),

    #需求列表
    url(r'^require_list/', requirement.require_list),
    url(r'^get_require/', requirement.get_require),
    url(r'^add_require/', requirement.add_require),
    url(r'^enter_main/', requirement.enter_main),
    url(r'^delete_require/', requirement.delete_require),

    #bug列表
    url(r'^bug/', bug.bug_list),
    url(r'^get_bug/', bug.get_bug),
    url(r'^add_bug/', bug.add_bug),
)