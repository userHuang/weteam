# -*- coding:utf-8 -*-

import time
import json
from datetime import timedelta, datetime, date

from django import template

register = template.Library()

@register.filter(name='to_json')
def to_json(obj):
    if not obj:
        return ""
    else:
        result = json.dumps(obj)
        return result
