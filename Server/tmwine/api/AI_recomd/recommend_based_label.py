import torch.nn as nn
import pandas as pd
import numpy as np
import torch
import os

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

import numpy as np
import torch
import pandas as pd

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
    template_path = PATH + '/api/AI_recomd/DB_to_ML.csv'
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
    model = torch.load(PATH + '/api/AI_recomd/model_211230.pth')
    model.eval()

    ## model에 data 넣고 predict 하기
    pred = model(input_data)
    y_pred = np.argmax(pred.detach().cpu().numpy(), axis=1).flatten()

    return y_pred[0]



def Wine_recomender(list) :
    # list = [A 50% B 30%, 1, 3, 3, 3]
    # 서버에서 전달 받은 list
    #list = ['가르나차(Garnacha) 85%, 카베르네 소비뇽(Cabernet Sauvignon) 5%, 까리네나(Carinena) 5%', 1, 3, 5, 4]

    ## list wine의 예측 모델
    prediction = PredictCluster(list)
    ret = prediction
    print(prediction)

    #f = open("name.txt", "r")
    #ret = f.read()

    return ret