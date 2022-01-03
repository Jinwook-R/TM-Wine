## wine 전체 DB 파일 한 번에 넣고 출력하는 코드
## 참고용

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



PATH = 'C:/Users/User/PycharmProjects/test'
data_path = PATH + '/wineDB_UTF-8_final.csv'

X_data = pd.read_csv(data_path, encoding='UTF8')

X_data.drop(['아이디','품명(영문)','품명(국문)','가격','카테고리','생산지','도수'], axis = 1, inplace = True)
X_data = X_data.to_numpy()
cluster = []
for i in range(len(X_data)):
    wine = X_data[i].tolist()
    print(wine)
    prediction = predict_cluster.PredictCluster(wine)
    cluster.append(prediction)

for i in range(8):
    print('{} : {}'.format(i,cluster.count(i)))
print(cluster)
#cluster_np = np.array(cluster)
#df = pd.DataFrame(cluster_np)
#df.to_csv(PATH+'/wineDB_cluster.csv', index=False)