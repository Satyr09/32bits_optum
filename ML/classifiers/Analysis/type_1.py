# -*- coding: utf-8 -*-
"""
Created on Wed Oct 30 22:01:40 2019

@author: Avigyan
"""

import pandas as pd
from sklearn.metrics import accuracy_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MinMaxScaler
from imblearn.over_sampling import SMOTE, ADASYN


data = pd.read_csv("F:\\optum\\data\\f_data_cut_icutype_1.csv")
data=data.drop(columns=['RecordID', 'ICUType'])


#scaler = MinMaxScaler()
#data[:] = scaler.fit_transform(data[:])


col_list=['GCS_mean',
'Platelets_mean',
'WBC_25q', 
'Glucose_Max(D)-Min(D)', 
'Na_25q', 
'BUN_mean', 
'Glucose_mode',
'Urine_Max(D)-Min(D)',
'Na_Max(D)',
'HCT_Max(D)', 
'K_sum', 
'HCO3_Max(D)',
'Platelets_F',
'BUN_Max(D)-Min(D)',
'Platelets_std',
'BUN_sum',
'BUN_50q',
'WBC_med',
'HR_F-L', 
'GCS_Max',
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



clf2 = RandomForestClassifier(n_jobs=-1,max_features= 'sqrt' ,n_estimators=125, oob_score = True)
clf2.fit(x_resampled, y_resampled)
predicted = clf2.predict(x_test)


# get the accuracy
print (accuracy_score(y_test, predicted))

from sklearn.metrics import confusion_matrix
#from sklearn.model_selection import GridSearchCV
print(confusion_matrix(y_test, predicted))















#rfc = RandomForestClassifier(n_jobs=-1,max_features= 'sqrt' ,n_estimators=50, oob_score = True)

#param_grid = { 
#    'n_estimators': [200, 700],
#    'max_features': ['auto', 'sqrt', 'log2']
#}

#CV_rfc = GridSearchCV(estimator=rfc, param_grid=param_grid, cv= 5)
#CV_rfc.fit(x_resampled, y_resampled)
#print (CV_rfc.best_params_)