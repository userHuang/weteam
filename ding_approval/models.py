# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class DingApproval(models.Model):
    """
    钉钉申请列表
    """
    money = models.DecimalField(max_digits=65, decimal_places=2, null=True)#(元)
    approval_id = models.IntegerField(max_length=32, null=True) #申请人id
    remark = models.TextField() #内容
    status =  models.IntegerField(max_length=32, default=0) #状态{0:申请中, 1:通过, 2:驳回}
    is_deleted = models.BooleanField(default=False) # 是否删除
    created_at = models.DateTimeField(auto_now_add=True) #创建时间

    class Meta(object):
        db_table = 'ding_approval'

# Create your models here.
