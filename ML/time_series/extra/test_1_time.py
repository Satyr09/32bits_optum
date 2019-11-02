# -*- coding: utf-8 -*-
"""
Created on Sat Nov  2 17:25:51 2019

@author: Avigyan
"""




from pandas import read_csv

from matplotlib import pyplot
from statsmodels.tsa.arima_model import ARIMA
from sklearn.metrics import mean_squared_error
 

 
#series = read_csv('https://raw.githubusercontent.com/jbrownlee/Datasets/master/shampoo.csv', header=0, parse_dates=[0], index_col=0, squeeze=True, date_parser=parser)



series= read_csv('F:\\optum\\data\\time_data\\glucose.csv')
X = series.values.astype('float32')
size = int(len(X) * 0.66)
train, test = X[0:size], X[size:len(X)]
history = [x for x in train]
predictions = list()
for t in range(len(test)):
	model = ARIMA(history, order=(1,0,0))
	model_fit = model.fit(disp=0)
	output = model_fit.forecast()
	yhat = output[0]
	predictions.append(yhat)
	obs = test[t]
	history.append(obs)
	print('predicted=%f, expected=%f' % (yhat, obs))
error = mean_squared_error(test, predictions)
print('Test MSE: %.3f' % error)
# plot
output = model_fit.forecast()
yhat = output[0]
predictions.append(yhat)
pyplot.plot(test)
pyplot.plot(predictions, color='red')
pyplot.show()

