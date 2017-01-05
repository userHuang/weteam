# -*- coding: utf-8 -*-
from django.db import models
# Create your models here.

class AccountUserProfile(models.Model):
    name = models.CharField(max_length=32, default='') #账号名称
    address = models.CharField(max_length=32, default='') #地址
    tel_num = models.CharField(max_length=16, default='') #电话
    remark = models.CharField(max_length=1024, default='') #备注
    
    class Meta(object):
        db_table = 'account_user_profile'