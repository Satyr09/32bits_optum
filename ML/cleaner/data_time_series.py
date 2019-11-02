# -*- coding: utf-8 -*-
"""
Created on Sat Nov  2 14:09:52 2019

@author: Avigyan
"""

import glob
x=glob.glob('F:\optum\data\extra_data\set-a\*')

import pandas as pd
#import csv 

bun=[]
bun_time=[]
gcs=[]
gcs_time=[]
wbc=[]
wbc_time=[]
glucose=[]
glucose_time=[]
na=[]
na_time=[]
hct=[]
hct_time=[]
k=[]
k_time=[]
hco3=[]
hco3_time=[]
mg=[]
mg_time=[]
urine=[]
urine_time=[]
platelate=[]
platelate_time=[]



fg=0
for file in x:
    bunt=[]
    bun_timet=[]
    gcst=[]
    gcs_timet=[]
    wbct=[]
    wbc_timet=[]
    glucoset=[]
    glucose_timet=[]
    nat=[]
    na_timet=[]
    hctt=[]
    hct_timet=[]
    kt=[]
    k_timet=[]
    hco3t=[]
    hco3_timet=[]
    mgt=[]
    mg_timet=[]
    urinet=[]
    urine_timet=[]
    platelatet=[]
    platelate_timet=[]
    df =pd.read_csv(file)
    
    for row in df.iterrows():
        if row[1][1]=='Glucose':
            glucoset.append(row[1][2])
            #print('a')
            glucose_timet.append(row[1][0])
         
        elif row[1][1]=='Na':
            nat.append(row[1][2])
            #print('b')
            na_timet.append(row[1][0])
        elif row[1][1]=='BUN':
            bunt.append(row[1][2])
            #print('f')
            bun_timet.append(row[1][0])
        elif row[1][1]=='WBC':
            wbct.append(row[1][2])
            #print('e')
            wbc_timet.append(row[1][0])
        elif row[1][1]=='HCT':
            hctt.append(row[1][2])
            #print('d')
            hct_timet.append(row[1][0])
        elif row[1][1]=='Mg':
            mgt.append(row[1][2])
           # print('c')
            mg_timet.append(row[1][0])
        elif row[1][1]=='Urine':
            urinet.append(row[1][2])
            
            urine_timet.append(row[1][0])
        elif row[1][1]=='K':
            kt.append(row[1][2])
          
            k_timet.append(row[1][0])
        elif row[1][1]=='Platelets':
            platelatet.append(row[1][2])
            
            platelate_timet.append(row[1][0])
        elif row[1][1]=='HCO3':
            hco3t.append(row[1][2])
           
            hco3_timet.append(row[1][0])   
       
        
        
    if len(glucoset)>len(glucose):
        glucose=glucoset
        glucose_time=glucose_timet
  
    if len(nat)>len(na):
        na=nat
        na_time=na_timet
    if len(bunt)>len(bun):
        bun=bunt
        bun_time=bun_timet
    if len(hctt)>len(hct):
        hct=hctt
        hct_time=hct_timet
    if len(mgt)>len(mg):
        mg=mgt
        mg_time=mg_timet
    if len(urinet)>len(urine):
        urine=urinet
        urine_time=urine_timet
    if len(kt)>len(k):
        k=kt
        k_time=k_timet
    if len(platelatet)>len(platelate):
        platelate=platelatet
        platelate_time=platelate_timet
    if len(hco3t)>len(hco3):
        hco3=hco3t
        hco3_time=hco3_timet
    if len(wbct)>len(wbc):
        wbc=wbct
        wbc_time=wbc_timet

    print(fg)
    fg+=1

data_glucose={'time':glucose_time,'value':glucose}
df = pd.DataFrame(data_glucose)

print(glucose)



df.to_excel("glucose.xlsx",sheet_name='Sheet_name_1')


data_na={'time':na_time,'value':na}
df = pd.DataFrame(data_na)

df.to_excel("na.xlsx",sheet_name='Sheet_name_1')
    
data_bun={'time':bun_time,'value':bun}
df = pd.DataFrame(data_bun)
print(df)

df.to_excel("bun.xlsx",sheet_name='Sheet_name_1')
    


data_hct={'time':hct_time,'value':hct}
df = pd.DataFrame(data_hct)

df.to_excel("hct.xlsx",sheet_name='Sheet_name_1')

data_mg={'time':mg_time,'value':mg}
df = pd.DataFrame(data_mg)

df.to_excel("mg.xlsx",sheet_name='Sheet_name_1')


data_urine={'time':urine_time,'value':urine}
df = pd.DataFrame(data_urine)

df.to_excel("urine.xlsx",sheet_name='Sheet_name_1')
    

data_k={'time':k_time,'value':k}
df = pd.DataFrame(data_k)

df.to_excel("k.xlsx",sheet_name='Sheet_name_1')
    

    
    
data_platelate={'time':platelate_time,'value':platelate}
df = pd.DataFrame(data_platelate)

df.to_excel("platelate.xlsx",sheet_name='Sheet_name_1')
    
data_hco3={'time':hco3_time,'value':hco3}
df = pd.DataFrame(data_hco3)

df.to_excel("hco3.xlsx",sheet_name='Sheet_name_1')
    
    
    
data_wbc={'time':wbc_time,'value':wbc}
df = pd.DataFrame(data_wbc)

df.to_excel("wbc.xlsx",sheet_name='Sheet_name_1')

