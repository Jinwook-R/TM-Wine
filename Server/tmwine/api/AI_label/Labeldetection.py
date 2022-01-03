import os, sys

def LabelDetector(img) :

    file = open("name.txt", "w")
    file.write("no-result")

    tmp = "python api/AI_label/yolov5/detect.py --source " + img
    os.system(tmp)

    f = open("name.txt", "r")
    ret = f.read()

    ## 'G7', 'umm', 'yellowtail', 'yoserose']
    if ret=="G7" :
        ret = "G7 Reserva Cabernet Sauvignon"

    elif ret=="umm" :
        ret = "MMM"

    elif ret=="yellowtail" :
        ret = "Yellow Tail; Semillon Sauvignon Blanc"

    elif ret=="yoserose" :
        ret = "YOSEROSE"



    return ret


# conda create -n Pytorch python=3.7
