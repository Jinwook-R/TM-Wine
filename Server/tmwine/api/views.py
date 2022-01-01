import os
import base64
from pathlib import Path
from PIL import Image
from django.shortcuts import render
from .models import *
from django.http import HttpResponse, JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view

BASE_DIR = Path(__file__).resolve().parent.parent

@api_view(['POST'])
def labelRecommendation(request):
    print(base64.b64decode(request.data.encode('UTF-8'))
#     img = Image.open(request.FILES['label'])
#     imgName = request.data['label'].name
#     imgPath = os.path.join(os.path.join(BASE_DIR, 'label_img'), imgName)
#     img.save(imgPath, "JPEG")
    return HttpResponse("Success")
