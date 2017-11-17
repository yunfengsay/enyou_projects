import requests
from pyquery import PyQuery as pq
import re,time
url = "http://www.baidu.com/s"

querystring = {"ie":"utf-8","f":"8","rsv_bp":"1","rsv_idx":"1","tn":"baidu","wd":"PM社区","oq":"PM社区","rsv_pq":"f88eb42b00007a3d","rsv_t":"7a8bULnoJvq3LsRH97FPvh1vyWNZnEOrIV9hedNPj0G7cPhGtlxrzqJ2B1M","rqlang":"cn","rsv_enter":"0"}

headers = {
    'cache-control': "no-cache",
    'postman-token': "b7c76b93-5f25-ec65-e241-ab07f9e17146"
    }

response = requests.request("GET", url, headers=headers, params=querystring)
html = response.text
p = pq(html)

page = 1


def findNextUrl(p):
    return "http://www.baidu.com" + p("a:contains(下一页)").attr("href")

while 1:
    url = findNextUrl(p)
    response = requests.request("GET", url, headers=headers, params=querystring)
    html = response.text
    print("正在查找第  ", page, " 页")
    print(url)
    # par = re.compile('^bbs.*?')
    # if re.match("bbs\.masterchat\.cn", html, flags=0):
    if html.find("ThisPM") > 0:
        print("找到了  url:  ", url)
        break
    p = pq(html)
    page += 1
