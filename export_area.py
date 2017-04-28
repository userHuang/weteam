# -*- coding: utf-8 -*-
"""
简单爬虫
"""
__author__ = ""
__date__ = "$2017-04-17 14:13:00$"
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.
__license__ = "MIT"
import os
import requests
from bs4 import BeautifulSoup

target_url = 'http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/201703/t20170310_1471429.html'

headers = {'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			'Accept-Encoding': 'gzip, deflate',
			'Accept-Language': 'zh-CN,en-US;q=0.7,en;q=0.3',
			'Connection': 'keep-alive',
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:52.0) Gecko/20100101 Firefox/52.0'}

request = requests.Session()
request.headers.update(headers)
response = request.get(target_url)

html = response.content.decode('utf8')

soup = BeautifulSoup(html, 'html.parser')

p_list = soup.select("p.MsoNormal")

data_dict = {}

for i in p_list:
	code_text = ""
	name_text = ""

	code_part_list = i.select("span[lang='EN-US']")
	for a_code in code_part_list:
		code_text = code_text or a_code.get_text().strip()
	text_part_list = i.select("span[style='font-family: 宋体']")
	for a_name in text_part_list:
		name_text = name_text or a_name.get_text().strip()
	data_dict[code_text] = name_text

print(data_dict)

with open('area_dict.txt','w') as f:
	f.write(str(data_dict))
