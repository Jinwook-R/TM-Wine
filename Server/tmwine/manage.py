#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


import torch.nn as nn
import pandas as pd
import numpy as np
import torch

# DNN model
class Model(nn.Module):
    def __init__(self, input_dim, output_class):
        super(Model, self).__init__()
        # input_dim : input features의 개수
        # output_class : output class의 개수
        ## batchnorm은 Relu 넣고 그 사이에 넣을 것.
        self.layer_1 = nn.Linear(input_dim, 200)
        self.layer_2 = nn.Linear(200, 100)
        self.layer_3 = nn.Linear(100, 200)
        self.layer_4 = nn.Linear(200, 50)
        self.layer_out = nn.Linear(50, output_class)
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(p=0.1)
        self.batchnorm_1 = nn.BatchNorm1d(200)
        self.batchnorm_2 = nn.BatchNorm1d(100)
        self.batchnorm_3 = nn.BatchNorm1d(200)
        self.batchnorm_4 = nn.BatchNorm1d(50)
        self.softmax = nn.Softmax()

    def forward(self, inputs):
        x = self.relu(self.layer_1(inputs))
        x = self.batchnorm_1(x)
        x = self.relu(self.layer_2(x))
        x = self.batchnorm_2(x) # Can't analyze file. Please try to change encoding type. If that doesn't help, maybe the file is not: csv, or the file is empty.
        x = self.relu(self.layer_3(x))
        x = self.batchnorm_3(x)
        x = self.relu(self.layer_4(x))
        x = self.batchnorm_4(x)
        x = self.dropout(x)
        x = self.layer_out(x)
        x = self.softmax(x)
        return x

def split_data(data):
    answer=[]
    a=data
    b=a[0].split(', ')
    for i in range(len(b)):
        c=b[i].split(')')
        answer.append(('품종_'+c[0]+')',int(c[1].split('%')[0])/100))
    return answer

# list 예시 : [A 50% B 30%, 1, 3, 3, 3]
def PredictCluster(list):

    PATH = os.getcwd()


    ## one-hot-encoding 용 template
    template_path = PATH + '/api/flow2/DB_to_ML.csv'
    df_encoding = pd.read_csv(template_path, encoding='UTF8')
    df_encoding.drop(['Unnamed: 0'], axis = 1, inplace = True)

    a = split_data(list)

    for i in range(len(a)):
        if a[i][0] in df_encoding.columns:
            df_encoding[a[i][0]] = a[i][1]
        else:
            return -1

    df_encoding['당도_%d' % list[1]] = 1
    df_encoding['산도_%d' % list[2]] = 1
    df_encoding['바디_%d' % list[3]] = 1
    df_encoding['타닌_%d' % list[4]] = 1


    X_data = df_encoding.to_numpy()

    input_data = torch.Tensor(X_data).float()

    ## laod model
    model = torch.load(PATH + '/model_211230.pth')
    model.eval()

    ## model에 data 넣고 predict 하기
    pred = model(input_data)
    y_pred = np.argmax(pred.detach().cpu().numpy(), axis=1).flatten()

    return y_pred[0]



#############


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tmwine.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
