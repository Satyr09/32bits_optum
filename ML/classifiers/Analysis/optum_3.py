# -*- coding: utf-8 -*-
"""optum_3.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1daWPTXQrjXEcRTos6jjv_D2se5W6WaXK
"""

import xgboost

!gdown https://drive.google.com/uc?id=17Z4RZFpo6SIS6xKgem7U-5g4VwcOX7cg

!unzip data.zip

ls

import pandas as pd
from sklearn.metrics import accuracy_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MinMaxScaler
from imblearn.over_sampling import SMOTE, ADASYN


data = pd.read_csv("f_data_cut_icutype_3.csv")
data=data.drop(columns=['RecordID', 'ICUType'])
from sklearn.model_selection import train_test_split
df_train, df_test = train_test_split(data, 
                                     train_size = 0.7, 
                                     test_size = 0.3, 
                                     random_state = 100)

x_train=df_train.drop(columns=['In-hospital_death'])
y_train=df_train['In-hospital_death']




#x_resampled, y_resampled = SMOTE().fit_resample(x_train, y_train)



x_test=df_test.drop(columns=['In-hospital_death'])
y_test=df_test['In-hospital_death']

import numpy as np 
import pandas as pd 
import sklearn
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.model_selection import KFold
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn import metrics

import xgboost as xgb
from xgboost import XGBClassifier
from xgboost import plot_importance

tree = DecisionTreeClassifier(max_depth=2)

# adaboost with the tree as base estimator
adaboost_model_1 = AdaBoostClassifier(
    base_estimator=tree,
    n_estimators=600,
    learning_rate=1.5,
    algorithm="SAMME")

adaboost_model_1.fit(x_resampled, y_resampled)

predicted = model.predict(x_test)


# get the accuracy
print (accuracy_score(y_test, predicted))

from sklearn.metrics import confusion_matrix
#from sklearn.model_selection import GridSearchCV
print(confusion_matrix(y_test, predicted))

predictions = model.predict_proba(x_test)
predictions[:10]
metrics.roc_auc_score(y_test, predictions[:,1])

param_grid = {"base_estimator__max_depth" : [2, 5],
              "n_estimators": [200, 400, 600]
             }
tree = DecisionTreeClassifier()

# adaboost with the tree as base estimator
# learning rate is arbitrarily set to 0.6, we'll discuss learning_rate below
ABC = AdaBoostClassifier(
    base_estimator=tree,
    learning_rate=0.6,
    algorithm="SAMME")
folds = 3
grid_search_ABC = GridSearchCV(ABC, 
                               cv = folds,
                               param_grid=param_grid, 
                               scoring = 'roc_auc', 
                               return_train_score=True,                         
                               verbose = 1)
grid_search_ABC.fit(x_resampled, y_resampled)

model = XGBClassifier()
model.fit(x_train, y_train)

y_pred = model.predict_proba(x_test)
y_pred[:10]

folds = 3

# specify range of hyperparameters
param_grid = {'learning_rate': [0.2, 0.6], 
             'subsample': [0.3, 0.6, 0.9]}          


# specify model
xgb_model = XGBClassifier(max_depth=2, n_estimators=200)

# set up GridSearchCV()
model_cv = GridSearchCV(estimator = xgb_model, 
                        param_grid = param_grid, 
                        scoring= 'roc_auc', 
                        cv = folds, 
                        verbose = 1,
                        return_train_score=True)      

model_cv.fit(x_train, y_train)

cv_results = pd.DataFrame(model_cv.cv_results_)
cv_results

params = {'learning_rate': 0.2,
          'max_depth': 2, 
          'n_estimators':200,
          'subsample':0.9,
         'objective':'binary:logistic'}

# fit model on training data
model = XGBClassifier(params = params)
model.fit(x_train, y_train)

predicted = model.predict(x_test)


# get the accuracy
print (accuracy_score(y_test, predicted))

from sklearn.metrics import confusion_matrix
#from sklearn.model_selection import GridSearchCV
print(confusion_matrix(y_test, predicted))

importance = dict(zip(x_train.columns, model.feature_importances_))
print(sorted(importance.items(), key = 
             lambda kv:(kv[1], kv[0])))

from sklearn.externals import joblib
joblib.dump(model, 'ICU3.pkl')

ls

