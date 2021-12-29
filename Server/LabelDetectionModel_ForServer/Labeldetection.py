import os, sys

def LabelDetector(img) :

    file = open("name.txt", "w")
    file.write("no-result")

    tmp = "python ./tmp/detect.py --source " + img
    os.system(tmp)

    f = open("name.txt", "r")
    ret = f.read()

    return ret


# conda create -n Pytorch python=3.7
