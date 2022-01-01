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

    responseBody = {
    "result1" : {
            "name" : "wine1, Pinor Noir",
            "price" : 310000,
            "category" : "Red",
            "origin" : "Spain",
            "varieties" : "Mencia (100%)",
            "alcoholicity" : "15.3",
            "sweetness" : 1,
            "acidity" : 0,
            "body" : 4,
            "tannin" : 0,
           },
            "result2":
              {"name" : "wine2",
               "price" : 270000,
               "category" : "Red",
               "origin" : "France",
               "varieties" : "Garnaca (85%), Carinena (10%)",
               "alcoholicity" : "15.3",
              "sweetness" : 2,
              "acidity" : 1,
              "body" : 5,
              "tannin" : 1
            }
       }

    return JsonResponse(responseBody, status = 200)

@api_view(['POST'])
def keywordRecommendation(request):
    responseBody = {
    "result1" : {
            "name" : "wine1, Pinor Noir",
            "price" : 310000,
            "category" : "Red",
            "origin" : "Spain",
            "varieties" : "Mencia (100%)",
            "alcoholicity" : "15.3",
            "sweetness" : 1,
            "acidity" : 0,
            "body" : 4,
            "tannin" : 0,
           },
            "result2":
              {"name" : "wine2",
               "price" : 270000,
               "category" : "Red",
               "origin" : "France",
               "varieties" : "Garnaca (85%), Carinena (10%)",
               "alcoholicity" : "15.3",
              "sweetness" : 2,
              "acidity" : 1,
              "body" : 5,
              "tannin" : 1
            }
       }

    return JsonResponse(responseBody, status = 200)

@api_view(['GET'])
def dailyRecommendation(request):
    '''
    logic
    '''
    return HttpResponse("Success")
