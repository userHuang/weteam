# -*- coding: utf-8 -*-

from django.conf.urls import *

import project
import project_main

urlpatterns = patterns('',
    url(r'^$', project.project_list),
    url(r'new_project/', project.new_project),
    
    url(r'main/', project_main.main)
)