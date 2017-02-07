# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class UserProfile(models.Model):
    user = models.ForeignKey(User, unique=True)
    name = models.CharField(max_length=32, default='') #登录名称
    img_url = models.CharField(max_length=256, default='') #图片地址
    address = models.CharField(max_length=32, default='') #地址
    status = models.BooleanField(default=True) #状态
    role = models.IntegerField(default=0) #角色{0:develop, 1:master}
    belongs = models.CharField(max_length=64, default='') #所属项目
    created_at = models.DateTimeField(auto_now_add=True) #创建时间
    updated_at = models.DateTimeField(auto_now_add=True) #创建时间
    
    class Meta(object):
        db_table = 'account_user_profile'