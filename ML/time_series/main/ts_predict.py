import sys
arr = sys.argv[1].split(',')

from pandas import read_csv
from statsmodels.tsa.arima_model import ARIMA


gcs_path = sys.argv[1]
bun_path = sys.argv[2]
creatanine_path = sys.argv[3]
urine_path = sys.argv[4]



# series= read_csv(urine_path)#urine
# me=series["value"].mean()
# for row in series.iterrows():
#     row[1]["value"]-=me
# x = series.values


# #liste = [x for x in train]
# try:
#     model = ARIMA(x, order=(6,2,1))
#     model_fit = model.fit(disp=0)
#     output = model_fit.forecast()
#     yhat1 = output[0]

# except:
#     yhat1=-1



# series= read_csv(bun_path)#bun

# me=series["value"].mean()
# for row in series.iterrows():
#     row[1]["value"]-=me
    
# x = series.values.astype('float32')


# #liste = [x for x in train]
# try:
    
#     model = ARIMA(x, order=(0,0,2))
#     model_fit = model.fit(disp=0)
#     output = model_fit.forecast()
#     yhat2 = output[0]

  
# except:
#     yhat2=-1

# series= read_csv(creatanine_path)#creatinine

# me=series["value"].mean()
# for row in series.iterrows():
#     row[1]["value"]-=me


# x = series.values.astype('float32')


# #liste = [x for x in train]
# try:
#     model = ARIMA(x, order=(1,0,1))
#     model_fit = model.fit(disp=0)
#     output = model_fit.forecast()
#     yhat3 = output[0]

  
# except:
#     yhat3=-1
    
# series= read_csv(gcs_path)#gcs

# me=series["value"].mean()
# for row in series.iterrows():
#     row[1]["value"]-=me
    
# x = series.values.astype('float32')
# #liste = [x for x in train]
# try:
#     model = ARIMA(x, order=(8,0,1))
#     model_fit = model.fit(disp=0)
#     output = model_fit.forecast()
#     yhat4 = output[0]


# except:
#    yhat4=-1
   
data='{"gcs":15,"creatinine":19,"bun":8,"urine":120}'

print(data)