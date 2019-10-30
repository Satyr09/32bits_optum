# -*- coding: utf-8 -*-
"""
Created on Mon Oct 28 14:05:49 2019

@author: Avigyan
"""

import pandas as pd

df= pd.read_csv('F:\optum\\f_data_2.csv')
df= df[df.columns[df.isnull().mean() < 0.1]]
df = df.dropna()
df = df.reset_index(drop=True)
export_csv = df.to_csv ('F:\optum\\f_data_cut.csv', index = None, header=True) 

print(df)

