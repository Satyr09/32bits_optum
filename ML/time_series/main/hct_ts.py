# -*- coding: utf-8 -*-
"""
Created on Sun Nov  3 00:45:25 2019

@author: Avigyan
"""

from pandas import read_csv
from statsmodels.tsa.arima_model import ARIMA



series= read_csv('F:\\optum\\data\\time_data\\k.csv')
x = series.values.astype('float32')


#liste = [x for x in train]
model = ARIMA(x, order=(1,0,0))
model_fit = model.fit(disp=0)
output = model_fit.forecast()
yhat = output[0]

print(yhat)
