# -*- coding: utf-8 -*-

from django.conf.urls import *

import project
import project_main
import members
import requirement

urlpatterns = patterns('',
    url(r'^$', project.project_list),
    url(r'new_project/', project.new_project),
    
    url(r'main/', project_main.main),

    url(r'members/', members.members),

    url(r'require_list/', requirement.require_list),
    url(r'get_require/', requirement.get_require),
    url(r'add_require/', requirement.add_require),
)