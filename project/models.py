# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Project(models.Model):
    """
    项目
    """
    name = models.CharField(max_length=32, null=True) #项目名称
    description = models.TextField() #项目描述
    is_deleted = models.BooleanField(default=False) # 是否删除
    created_at = models.DateTimeField(auto_now_add=True) #创建时间

    class Meta(object):
        db_table = 'project_project'


# class Member(models.Model):
#     """
#     成员
#     """
#     name = models.CharField(max_length=32, null=True) #姓名
#     image = models.CharField(max_length=1024, null=True) #头像
#     role = models.IntegerField() #角色
#     is_deleted = models.BooleanField(default=False) # 是否删除
#     created_at = models.DateTimeField(auto_now_add=True) #创建时间
    
#     class Meta(object):
#         db_table = 'project_member'


class Requirement(models.Model):
    """
    需求
    """
    project_id = models.IntegerField(default=0) #关联项目的id
    relation_id = models.IntegerField(default=-1) #关联需求id的bug
    name = models.CharField(max_length=1024, null=True) #需求名
    creator = models.CharField(max_length=32, null=True) #创建人
    creator_id = models.IntegerField(default=0) #创建人的id
    participant = models.CharField(max_length=32, default="") #s所有参与人 user_ids （字符串）
    belong_id = models.IntegerField(max_length=32, default=0) #需求(bug)归属人 user_id
    remark = models.TextField() #备注
    status = models.IntegerField(default=-1) # {-1:未进入看板, 0: TODO, 1:待开发, 2:开发, 3:待测试, 4:测试, 5:已完成}
    require_type = models.IntegerField(default=0) # {0:需求, 1：bug}
    created_at = models.DateTimeField(auto_now_add=True) #创建时间
    updated_at = models.DateTimeField(auto_now_add=True) #更新时间
    end_at = models.DateTimeField(null=True) #结束时间
    is_deleted = models.BooleanField(default=False) # 是否删除
    
    class Meta(object):
        db_table = 'project_requirement'