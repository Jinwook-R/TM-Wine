import os, base64
from pathlib import Path
from random import choice, randrange
from PIL import Image
from django.shortcuts import render
from .models import *
from django.db import connection
from django.http import HttpResponse, JsonResponse, QueryDict
from rest_framework import status
from rest_framework.decorators import api_view
import pymysql

from api.AI_label import Labeldetection
from api.AI_recomd import recommend_based_label

BASE_DIR = Path(__file__).resolve().parent.parent

@api_view(['POST'])
def labelRecommendation(request):
    if request.method != 'POST':
        return HttpResponse("Bad Request", status=400)

    requestBody = QueryDict.dict(request.data)
    with open('img.png', "wb") as f:
        f.write(base64.b64decode(requestBody['image']))

    PATH = os.getcwd()
    label_name = Labeldetection.LabelDetector(PATH + "/img.png")

    if(label_name=='None') :
       return HttpResponse("Nothing detected")

    conn = pymysql.connect(host="localhost", user="root", password="1234", db="Tmwine")
    db_conn = conn.cursor()
    wine_info=[]

    ## find wine info
    sql_cmd = 'SELECT 품종 FROM Wine where 품명영문 = %s'
    db_conn.execute(sql_cmd, (label_name))
    wine_info.append(db_conn.fetchall()[0][0])

    sql_cmd = 'SELECT 당도 FROM Wine where 품명영문 = %s'
    db_conn.execute(sql_cmd, (label_name))
    wine_info.append(db_conn.fetchall()[0][0])

    sql_cmd = 'SELECT 산도 FROM Wine where 품명영문 = %s'
    db_conn.execute(sql_cmd, (label_name))
    wine_info.append(db_conn.fetchall()[0][0])

    sql_cmd = 'SELECT 바디 FROM Wine where 품명영문 = %s'
    db_conn.execute(sql_cmd, (label_name))
    wine_info.append(db_conn.fetchall()[0][0])

    sql_cmd = 'SELECT 타닌 FROM Wine where 품명영문 = %s'
    db_conn.execute(sql_cmd, (label_name))
    wine_info.append(db_conn.fetchall()[0][0])

    clustered_num = recommend_based_label.Wine_recomender(wine_info)

    ## find similar wine's PK
    sql_cmd = 'SELECT 와인번호 FROM HotelWine where 군집 = %s ORDER BY 평점 DESC LIMIT 2'
    db_conn.execute(sql_cmd, (clustered_num))
    ret = db_conn.fetchall()
    ## find similar wine's info
    responseBody={}
    responseBody['labelName'] = label_name
    # for dic
    db_conn = conn.cursor(pymysql.cursors.DictCursor)

    sql_cmd = 'SELECT * FROM Wine where 와인번호 = %s'
    db_conn.execute(sql_cmd, (int(ret[0][0])))
    test = db_conn.fetchall()
    tmp = test[0]
    response1 = {}
    response1['id'] = tmp['와인번호']
    response1['name'] = tmp['품명영문'].replace(";", ",") + " (" + \
                        tmp['품명국문'].replace(";", ",") + ")"
    response1['price'] = tmp['가격']
    response1['category'] = tmp['카테고리']
    response1['origin'] = tmp['생산지']
    response1['varieties'] = tmp['품종'].replace(";", ",")
    response1['alcoholicity'] = tmp['알콜도수']
    response1['sweetness'] = tmp['당도']
    response1['acidity'] = tmp['산도']
    response1['body'] = tmp['바디']
    response1['tannin'] = tmp['타닌']
    responseBody['result1'] = response1

    db_conn.execute(sql_cmd, (int(ret[1][0])))
    test = db_conn.fetchall()
    tmp = test[0]
    response2 = {}
    response2['id'] = tmp['와인번호']
    response2['name'] = tmp['품명영문'].replace(";", ",") + " (" + \
                        tmp['품명국문'].replace(";", ",") + ")"
    response2['price'] = tmp['가격']
    response2['category'] = tmp['카테고리']
    response2['origin'] = tmp['생산지']
    response2['varieties'] = tmp['품종'].replace(";", ",")
    response2['alcoholicity'] = tmp['알콜도수']
    response2['sweetness'] = tmp['당도']
    response2['acidity'] = tmp['산도']
    response2['body'] = tmp['바디']
    response2['tannin'] = tmp['타닌']
    responseBody['result2'] = response2
    return JsonResponse(responseBody, status=200)

@api_view(['POST'])
def keywordRecommendation(request):
    if request.method != 'POST':
        return HttpResponse("Bad Request", status=400)

    requestBody = QueryDict.dict(request.data)
    keyword = "키워드" + str(requestBody['keyword'])

    topKeyword = Review.objects.order_by("-" + keyword)
    topKeywordList = []  # list of [wineId, keyword cnt]
    for x in range(topKeyword.values().count()):
        topKeywordList.append([topKeyword.values()[x]['와인번호_id'], topKeyword.values()[x][keyword]])

    topRated = HotelWine.objects.order_by("-평점")
    topRatedId = [r['와인번호_id'] for r in topRated.values()]  # list of PKs of top rated wines

    # Top 2 wines : sort by 평점 if keyword cnt is same
    topWineId = []
    topWine = []
    for i in range(1, len(topKeywordList)):
        if (len(topWine) == 2): break
        if(topKeywordList[i-1][0] in topWineId): continue
        if (topKeywordList[i][1] != topKeywordList[i - 1][1]):
            topWine.append(topKeywordList[i - 1][0])
            topWineId.append(topKeywordList[i - 1][0])
        else:
            w1 = topKeywordList[i - 1][0]
            w2 = topKeywordList[i][0]
            idx1 = topRatedId.index(w1)
            idx2 = topRatedId.index(w2)
            if (idx1 < idx2):
                topWine.append(w1)
                topWineId.append(w1)
            else:
                topWine.append(w2)
                topWineId.append(w2)

    result1 = Wine.objects.get(pk=topWine[0])
    result2 = Wine.objects.get(pk=topWine[1])
    responseBody = {}
    response1 = {}
    response1['id'] = result1.와인번호
    response1['name'] = result1.품명영문.replace(";", ",") + " (" + \
                        result1.품명국문.replace(";", ",") + ")"
    response1['price'] = result1.가격
    response1['category'] = result1.카테고리
    response1['origin'] = result1.생산지
    response1['varieties'] = result1.품종.replace(";", ",")
    response1['alcoholicity'] = result1.알콜도수
    response1['sweetness'] = result1.당도
    response1['acidity'] = result1.산도
    response1['body'] = result1.바디
    response1['tannin'] = result1.타닌
    responseBody['result1'] = response1

    response2 = {}
    response2['id'] = result2.와인번호
    response2['name'] = result2.품명영문.replace(";", ",") + " (" + \
                        result2.품명국문.replace(";", ",") + ")"
    response2['price'] = result2.가격
    response2['category'] = result2.카테고리
    response2['origin'] = result2.생산지
    response2['varieties'] = result2.품종.replace(";", ",")
    response2['alcoholicity'] = result2.알콜도수
    response2['sweetness'] = result2.당도
    response2['acidity'] = result2.산도
    response2['body'] = result2.바디
    response2['tannin'] = result2.타닌
    responseBody['result2'] = response2
    print(responseBody)
    return JsonResponse(responseBody, status=200)

@api_view(['GET'])
def dailyRecommendation(request):
    if request.method != 'GET':
        return HttpResponse("Bad Request", status=400)

    wineId = Wine.objects.values_list('와인번호', flat=True)
    randomId = randrange(1,30)
    randomWine = Wine.objects.get(pk=randomId)

    responseBody = {}
    responseBody['id'] = randomWine.와인번호
    responseBody['name'] = randomWine.품명영문.replace(";", ",") + " (" + \
                           randomWine.품명국문.replace(";", ",") + ")"
    responseBody['price'] = randomWine.가격
    responseBody['category'] = randomWine.카테고리
    responseBody['origin'] = randomWine.생산지
    responseBody['varieties'] = randomWine.품종.replace(";", ",")
    responseBody['alcoholicity'] = randomWine.알콜도수
    responseBody['sweetness'] = randomWine.당도
    responseBody['acidity'] = randomWine.산도
    responseBody['body'] = randomWine.바디
    responseBody['tannin'] = randomWine.타닌
    return JsonResponse(responseBody, status=200)
