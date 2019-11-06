# -*- coding: utf-8 -*-
"""
Created on Sun Nov  3 00:45:25 2019

@author: Avigyan
"""
import sys
from pandas import read_csv
from statsmodels.tsa.arima_model import ARIMA

path = sys.argv[1]
series= read_csv(path)
x = series.values.astype('float32')


#liste = [x for x in train]
model = ARIMA(x, order=(8,0,1))
model_fit = model.fit(disp=0)
output = model_fit.forecast()
yhat = output[0]

print(yhat[0])
sys.stdout.flush()