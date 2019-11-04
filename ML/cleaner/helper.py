# -*- coding: utf-8 -*-
"""
Created on Mon Oct 28 14:05:49 2019

@author: Avigyan
"""

import pandas as pd

df= pd.read_csv('F:\optum\\f_data_cut.csv')
df= df[df['ICUType']==4]

export_csv = df.to_csv ('F:\optum\\f_data_cut_icutype_4.csv', index = None, header=True) 

print(df)

