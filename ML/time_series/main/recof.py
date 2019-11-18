# -*- coding: utf-8 -*-
"""
Created on Mon Nov 18 02:27:14 2019

@author: Avigyan
"""
import pandas as pd
from scipy import sparse

df=pd.read_csv('H:\\32bits_optum\\32bits_optum-master\\ML\\time_series\\main\\output.csv')
#print(df.head())

userRatings = df.pivot_table(index=['RecordID'],columns=['Type'],values='Value')
userRatings = userRatings.dropna(thresh=10, axis=1).fillna(0,axis=1)

corrMatrix = userRatings.corr(method='pearson')
#print(corrMatrix.head(10))


def get_similar(movie_name,rating):
    similar_ratings = corrMatrix[movie_name]*(rating-0.5)
    similar_ratings = similar_ratings.sort_values(ascending=False)
    #print(type(similar_ratings))
    return similar_ratings

inputr = [("BUN_pc",1),("GCS_pc",1),("creatinine_pc",0),("URINE_pc",0)]
similar_movies = pd.DataFrame()
for movie,rating in inputr:
    similar_movies = similar_movies.append(get_similar(movie,rating),ignore_index = True)

#similar_movies.head(10)
xy=similar_movies.sum().sort_values(ascending=False).head(6)
#print(xy)
xy_idx = xy.index.tolist()
#print(xy_idx)
from string import Template
data=Template('{"reco1": "$yhat_4","reco2": "$yhat_3","reco3": "$yhat_2","reco4": "$yhat_1"}')
data = data.safe_substitute(yhat_1=xy_idx[2] , yhat_2 = xy_idx[3] , yhat_3 = xy_idx[4] , yhat_4=xy_idx[5])

print(data)