# -*- coding: utf-8 -*-
"""
Created on Wed Oct 30 22:52:30 2019

@author: Avigyan
"""

import pandas as pd
from sklearn.metrics import accuracy_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MinMaxScaler
from imblearn.over_sampling import SMOTE, ADASYN
from sklearn.model_selection import GridSearchCV

data = pd.read_csv("F:\optum\\data\\f_data_cut_icutype_2.csv")
data=data.drop(columns=['RecordID', 'ICUType'])


scaler = MinMaxScaler()
data[:] = scaler.fit_transform(data[:])


col_list=[ 'GCS_F-L',  
            'BUN_std(d)^2',  
        'Creatinine_Oianz',   
     'Urine_Sgn(mean(D))',   
             'Glucose_sum',   
                 'GCS_med',   
             'GCS_Max-Min',   
                 'BUN_sum',   
   'Glucose_Max(D)-Min(D)',   
          'Creatinine_sum',   
     'Creatinine_std(d)^2',   
        'GCS_Sgn(mean(D))',   
        'Na_Sgn(mean(D))',   
               'GCS_mode',   
         'Creatinine_Min',   
                 'GCS_50q',   
             'GCS_Max(D)',   
             'Glucose_len',   
            'Creatinine_F',   
          'Creatinine_25q',  
        'In-hospital_death']

data=data[col_list]

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



clf2 = RandomForestClassifier(n_jobs=-1,max_features= 'auto' ,n_estimators=150, oob_score = True)
clf2.fit(x_resampled, y_resampled)
predicted = clf2.predict(x_test)


# get the accuracy
print (accuracy_score(y_test, predicted))

from sklearn.metrics import confusion_matrix
#from sklearn.model_selection import GridSearchCV
print(confusion_matrix(y_test, predicted))



"""
acc:- 94.4444
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