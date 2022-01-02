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

BASE_DIR = Path(__file__).resolve().parent.parent

@api_view(['POST'])
def labelRecommendation(request):
    if request.method != 'POST':
        return HttpResponse("Bad Request", status=400)

    requestBody = QueryDict.dict(request.data)              # 요청 바디 불러오기 (django 내의 QueryDict type)
    with open('img.png', "wb") as f:                        # TODO : 이미지 파일명 수정해서 다른 경로에 저장
        f.write(base64.b64decode(requestBody['image']))
    '''
    responseBody = {"result1" :
                   {
                       "와인이름" : "어떤와인",
                       "품종" : "품종1 (60%), 품종2 (40%)"
                       ...
                   }}

    return JsonResponse(responseBody, status = 200)
    '''
    return HttpResponse("Success")

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
    topWine = []
    for i in range(1, len(topKeywordList)):
        if (len(topWine) == 2): break
        if (topKeywordList[i][1] != topKeywordList[i - 1][1]):
            topWine.append(topKeywordList[i - 1][0])
        else:
            w1 = topKeywordList[i - 1][0]
            w2 = topKeywordList[i][0]
            idx1 = topRatedId.index(w1)
            idx2 = topRatedId.index(w2)
            if (idx1 < idx2):
                topWine.append(w1)
            else:
                topWine.append(w2)

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
    return JsonResponse(responseBody, status=200)

@api_view(['GET'])
def dailyRecommendation(request):
    if request.method != 'GET':
        return HttpResponse("Bad Request", status=400)

    wineId = Wine.objects.values_list('와인번호', flat=True)
    #randomId = choice(wineId)
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
