# -*- coding: utf-8 -*-
"""
Created on Wed Oct 30 17:12:16 2019

@author: Avigyan
"""

import pandas as pd
import numpy as np
from sklearn.feature_selection import SelectKBest
from sklearn.feature_selection import chi2
from sklearn.feature_selection import VarianceThreshold
from sklearn.svm import LinearSVC
from sklearn.feature_selection import SelectFromModel
data = pd.read_csv("F:\optum\\data\\f_data_cut_icutype_1.csv")


#data=data.drop(columns=['RecordID', 'ICUType'])
x=data.drop(columns=['RecordID', 'ICUType','In-hospital_death'])
y=data['In-hospital_death']


from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler()
x[:] = scaler.fit_transform(x[:])


bestfeatures = SelectKBest(score_func=chi2, k=20)
fit = bestfeatures.fit(x,y)
dfscores = pd.DataFrame(fit.scores_)
dfcolumns = pd.DataFrame(x.columns)
#concat two dataframes for better visualization 
featureScores = pd.concat([dfcolumns,dfscores],axis=1)
featureScores.columns = ['Specs','Score']  #naming the dataframe columns
print(featureScores.nlargest(20,'Score')) 



col_list=['Creatinine_Oianz',  
'BUN_Sgn(mean(D))',  
            'GCS_25q',  
            'GCS_Min', 
              'GCS_F',  
           'GCS_mode',  
            'GCS_med',  
           'GCS_mean',  
            'GCS_50q',  
             'BUN_Max',             
	'BUN_50q',  
           'BUN_mean',  
            'BUN_med',  
            'BUN_Min',  
           'BUN_mode',  
         'Urine_25q',  
               'BUN_F',  
            'BUN_sum',  
         'Urine_med',  
        'Urine_mean',
        'In-hospital_death']
#data=data[col_list]



#X_new = SelectKBest(chi2, k=20).fit_transform(x, y)
#from sklearn.ensemble import ExtraTreesClassifier
#import matplotlib.pyplot as plt
#model = ExtraTreesClassifier()
#model.fit(x,y)

#feat_importances = pd.Series(model.feature_importances_, index=x.columns)
#feat_importances.nlargest(5).plot(kind='barh')
#plt.show()









