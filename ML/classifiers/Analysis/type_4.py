# -*- coding: utf-8 -*-
"""
Created on Wed Oct 30 23:12:43 2019

@author: Avigyan
"""
import pandas as pd
from sklearn.metrics import accuracy_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MinMaxScaler
from imblearn.over_sampling import SMOTE, ADASYN
from sklearn.model_selection import GridSearchCV

data = pd.read_csv("F:\optum\\data\\f_data_cut_icutype_4.csv")
data=data.drop(columns=['RecordID', 'ICUType'])





col_list=[ 'Creatinine_Oianz',  
                  'GCS_50q',  
                 'GCS_mode',  
                  'GCS_med',  
                 'GCS_mean',   
                 'GCS_25q',   
                  'GCS_Min',   
                  'GCS_Max',   
                 'BUN_mean',   
                  'BUN_Min',   
                 'BUN_mode',   
                  'BUN_50q',   
           'Creatinine_50q',   
                  'BUN_med',   
                   'BUN_Max',   
                    'GCS_F',   
  'Platelets_Sgn(mean(D))',   
         'HR_Sgn(mean(D))',   
                  'BUN_sum',   
        'In-hospital_death']

z=data[['Age']]

data=data[col_list]

age=[]

for row in z.iterrows():
    
    if row[1]['Age']<18:
        row[1]['Age']=1
        age.append(1)
    elif row[1]['Age']>=19 and row[1]['Age']<=33:
        row[1]['Age']=2
        age.append(2)
    elif row[1]['Age']>=34 and row[1]['Age']<=48:
        row[1]['Age']=3
        age.append(3)
    elif row[1]['Age']>=49 and row[1]['Age']<=64:
        row[1]['Age']=4
        age.append(4)
    elif row[1]['Age']>=65 and row[1]['Age']<=78:
        row[1]['Age']=5
        age.append(5)
    else:
        row[1]['Age']=6
        age.append(6)

scaler = MinMaxScaler()
data[:] = scaler.fit_transform(data[:])
data['Age']=age

from sklearn.model_selection import train_test_split
df_train, df_test = train_test_split(data, 
                                     train_size = 0.7, 
                                     test_size = 0.3, 
                                     random_state = 100)

x_train=df_train.drop(columns=['In-hospital_death'])
y_train=df_train['In-hospital_death']




x_resampled, y_resampled = SMOTE().fit_resample(x_train, y_train)



x_test=df_test.drop(columns=['In-hospital_death'])
y_test=df_test['In-hospital_death']

from sklearn.linear_model import LogisticRegressionCV
#clf = LogisticRegressionCV(cv=5, random_state=0,solver='sag', multi_class='multinomial')

clf2 = RandomForestClassifier(n_jobs=-1,max_features= 'sqrt' ,n_estimators=100, oob_score = True)
clf2.fit(x_resampled, y_resampled)
predicted = clf2.predict(x_test)


# get the accuracy
print (accuracy_score(y_test, predicted))

from sklearn.metrics import confusion_matrix
#from sklearn.model_selection import GridSearchCV
print(confusion_matrix(y_test, predicted))



"""
acc:- 84%
"""










"""
rfc = RandomForestClassifier(n_jobs=-1,max_features= 'sqrt' ,n_estimators=50, oob_score = True)

param_grid = { 
    'n_estimators': [100,125,150,175,200,225,250],
    'max_features': ['auto', 'sqrt', 'log2']
}

CV_rfc = GridSearchCV(estimator=rfc, param_grid=param_grid, cv= 5)
CV_rfc.fit(x_resampled, y_resampled)
print (CV_rfc.best_params_)
"""
