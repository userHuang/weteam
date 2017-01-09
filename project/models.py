# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=32, null=True) #项目名称
    description = models.TextField() #项目描述
    is_deleted = models.BooleanField(default=False) # 是否删除
    created_at = models.DateTimeField(auto_now_add=True) #创建时间
    
    class Meta(object):
        db_table = 'project_project'