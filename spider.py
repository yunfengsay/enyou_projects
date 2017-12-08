import requests
import json
import csv

url = "https://h5.leoao.com/lens/conduct/h5/api/v1/lapis"

querystring = {"lk-package":"public_platform.ground_sys.base_info.pull.front","lk-class":"STORE_SEARCH_LIST"}

payload = "{\"filter\":{\"is_active\":1,\"city_id\":\"2\",\"location\":\"-2,-2\"},\"sort\":3,\"page\":1,\"pageSize\":10,\"package\":\"public_platform.ground_sys.base_info.pull.front\",\"class\":\"STORE_SEARCH_LIST\"}"
headers = {
    'content-type': "application/json",
    'cache-control': "no-cache",
    'postman-token': "b4b40d20-51a1-bba9-0a9a-b7623205fe90"
    }

response = requests.request("POST", url, data=payload, headers=headers, params=querystring)
firstFloorList = []
payload_json = json.loads(payload)
firstFloorList.extend(response.json()["data"]["list"])
while len(response.json()["data"]["list"]):
    payload_json = json.loads(payload)
    payload_json["page"] += 1
    print("第" + str(payload_json["page"]))
    payload = json.dumps(payload_json)
    response = requests.request("POST", url, data=payload, headers=headers, params=querystring)
    firstFloorList.extend(response.json()["data"]["list"])

# print(firstFloorList)
newList = []
for v in firstFloorList:
    id = str(v["id"])
    url = "https://h5.leoao.com/lens/conduct/h5/api/v1/lapis"
    post_payload = {"store_id": id,"package":"public_platform.ground_sys.base_info.pull.front","class":"GET_STORE_BASE_INFO"}
    post_querystring = {"lk-package":"public_platform.ground_sys.base_info.pull.front","lk-class":"GET_STORE_BASE_INFO"}
    r = requests.request("POST", url, data=json.dumps(post_payload), headers=headers, params=post_querystring)
    # print(r.json()['data']['base_info'])
    newList.append(r.json()['data']['base_info'])


def nestedlist2csv(list, out_file):
    with open(out_file, 'w') as f:
        w = csv.writer(f)
        fieldnames=list[0].keys()  # solve the problem to automatically write the header
        w.writerow(fieldnames)
        for row in list:
            print(row)
            w.writerow(row.values())

nestedlist2csv(newList, "./foo.csv")