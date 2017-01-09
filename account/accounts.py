# -*- coding: utf-8 -*-

from django.http import HttpResponseRedirect, HttpResponse, HttpRequest
from django.template import Context, RequestContext
from django.shortcuts import render_to_response, render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
# Create your views here.

@login_required
def account(request):
    c = RequestContext(request, {
        'test': '222'
    })
    return render_to_response('account/account.html', c)