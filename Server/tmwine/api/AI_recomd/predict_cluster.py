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

   # PATH = 'C:/Users/User/PycharmProjects/test'

    ## one-hot-encoding 용 template
    template_path = './DB_to_ML.csv'
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
    model = torch.load('./model_211230.pth')
    model.eval()

    ## model에 data 넣고 predict 하기
    pred = model(input_data)
    y_pred = np.argmax(pred.detach().cpu().numpy(), axis=1).flatten()

    return y_pred[0]