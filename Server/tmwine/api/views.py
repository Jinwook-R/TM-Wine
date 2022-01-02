import os, base64
from pathlib import Path
from random import choice
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
    keyword = "keyword" + requestBody['keyword']

    topWine = Review.objects.order_by("-" + keyword)[:2]
    topWineId = [w['보와인번호_id'] for w in topWine.values()]
    wineInfo1 = Wine.objects.filter(pk=topWineId[0])
    wineInfo2 = Wine.objects.filter(pk=topWineId[1])

    responseBody = {}
    responseBody["result1"] = wineInfo1.values()[0]
    responseBody["result2"] = wineInfo2.values()[0]
    return JsonResponse(responseBody, status=200)

@api_view(['GET'])
def dailyRecommendation(request):
    if request.method != 'GET':
        return HttpResponse("Bad Request", status=400)

    wineId = Wine.objects.values_list('wineId', flat=True)
    randomId = choice(wineId)
    randomWine = Wine.objects.get(pk=randomId)
    responseBody = {}
    responseBody['name'] = randomWine.품명영문 + "(" + randomWine.품명국문 + ")"
    responseBody['price'] = randomWine.가격
    responseBody['category'] = randomWine.카테고리
    responseBody['origin'] = randomWine.생산지
    responseBody['varieties'] = randomWine.품종
    responseBody['alcoholicity'] = randomWine.알콜도수
    responseBody['sweetness'] = randomWine.당도
    responseBody['acidity'] = randomWine.산도
    responseBody['body'] = randomWine.바디
    responseBody['tannin'] = randomWine.타닌
    return JsonResponse(responseBody, status=200)
