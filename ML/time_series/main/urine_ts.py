# -*- coding: utf-8 -*-
"""
Created on Sun Nov  3 00:45:25 2019

@author: Avigyan
"""

from pandas import read_csv
from statsmodels.tsa.arima_model import ARIMA



series= read_csv('F:\\optum\\data\\time_data\\urine.csv')
x = series.values


#liste = [x for x in train]
model = ARIMA(x, order=(8,2,1))
model_fit = model.fit(disp=0)
output = model_fit.forecast()
yhat = output[0]

print(yhat)
