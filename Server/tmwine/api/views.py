import os, base64
from pathlib import Path
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
    '''
    keyword logic
    '''
    return HttpResponse("Success")

@api_view(['GET'])
def dailyRecommendation(request):
    '''
    logic
    '''
    return HttpResponse("Success")
