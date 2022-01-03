import predict_cluster
import torch.nn as nn
import pandas as pd
import numpy as np


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
        x = self.batchnorm_2(x)
        x = self.relu(self.layer_3(x))
        x = self.batchnorm_3(x)
        x = self.relu(self.layer_4(x))
        x = self.batchnorm_4(x)
        x = self.dropout(x)
        x = self.layer_out(x)
        x = self.softmax(x)
        return x


# list = [A 50% B 30%, 1, 3, 3, 3]
# 서버에서 전달 받은 list
list = ['가르나차(Garnacha) 85%, 카베르네 소비뇽(Cabernet Sauvignon) 5%, 까리네나(Carinena) 5%',1,3,5,4]

## list wine의 예측 모델
prediction = predict_cluster.PredictCluster(list)
print(prediction)