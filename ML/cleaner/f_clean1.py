
"""
Created on Mon Oct 28 14:05:49 2019

@author: Avigyan
"""












import glob
x=glob.glob('F:\optum\set-a\*')
import pandas as pd
import datetime as dt
#################################################################################
#helpers
FMT = '%H:%M:%S'
import numpy as np
from scipy import stats

def one_if_all_non_zero(arr):
	for i in arr:
		if i == 0:
			return 0
	return 1

def Max(arr):
	if len(arr) == 0:
		return 0
	return max(arr)

def Min(arr):
	if len(arr) == 0:
		return 0
	return min(arr)

def first(arr):
	if len(arr) == 0:
		return 0
	return arr[0]

def last(arr):
	if len(arr) == 0:
		return 0
	return arr[-1]

def std(arr):
	if len(arr) == 0:
		return 0
	return np.std(arr)

def signum(num):
	if num >0:
		return 1
	elif num <0:
		return -1
	return 0

def mean(array):
	if len(array) == 0:
		return 0
	return np.average(array)

def median(array):
	if len(array) == 0:
		return 0
	return np.median(array)

def mode(array):
	if len(array) == 0:
		return 0
	return stats.mode(array).mode[0]

def quartile(array):
	arr1 = []
	arr2 = []

	length = len(array)
	arrx = []
	for i in range(length):
		arrx.append(array[i])
	arrx.sort()
	if((len(array)%2) == 1):
		arr1 = array[:int(length/2)]
		arr2 = array[int(length/2)+1:]
	else:
		arr1 = array[:int(length/2)]
		arr2 = array[int(length/2):]

	return (median(arr1), median(arr2))
def diff(start,end):
    end_dt = dt.datetime.strptime(end, '%H:%M:%S')
    start_dt = dt.datetime.strptime(start, '%H:%M:%S')
    diff = (end_dt - start_dt)
    #ans=diff.hour+diff.minute/60+diff.second/3600
    return max(1,diff.seconds/60)
    
def derivative(array_time, array_func):
	prev = ''
	prev_time = ''
	length = len(array_time)
	der = []
	
	for i in range(length):
		if(array_func[i] != 'NA'):
			if(prev != ''):
				der.append(int(array_func[i]-prev)/float(diff(prev_time,array_time[i])))
			prev = array_func[i]
			prev_time = array_time[i]

	return der

##########################################################################################
pri_data=[]
head=['RecordID','Age','Gender','Height','ICUType','Weight','Albumin_Oianz','Albumin_F-L','Albumin_F','Albumin_Max(D)','Albumin_Max(D)-Min(D)','Albumin_Max','Albumin_mean(D)','Albumin_mean','Albumin_a(me-med)','Albumin_med(D)','Albumin_med','Albumin_Min','Albumin_mode','Albumin_len','Albumin_25q','Albumin_50q','Albumin_Max-Min','Albumin_Sgn(mean(D))','Albumin_std(D)','Albumin_std','Albumin_sum','Albumin_std^2','Albumin_std(d)^2','ALP_Oianz','ALP_F-L','ALP_F','ALP_Max(D)','ALP_Max(D)-Min(D)','ALP_Max','ALP_mean(D)','ALP_mean','ALP_a(me-med)','ALP_med(D)','ALP_med','ALP_Min','ALP_mode','ALP_len','ALP_25q','ALP_50q','ALP_Max-Min','ALP_Sgn(mean(D))','ALP_std(D)','ALP_std','ALP_sum','ALP_std^2','ALP_std(d)^2','ALT_Oianz','ALT_F-L','ALT_F','ALT_Max(D)','ALT_Max(D)-Min(D)','ALT_Max','ALT_mean(D)','ALT_mean','ALT_a(me-med)','ALT_med(D)','ALT_med','ALT_Min','ALT_mode','ALT_len','ALT_25q','ALT_50q','ALT_Max-Min','ALT_Sgn(mean(D))','ALT_std(D)','ALT_std','ALT_sum','ALT_std^2','ALT_std(d)^2','AST_Oianz','AST_F-L','AST_F','AST_Max(D)','AST_Max(D)-Min(D)','AST_Max','AST_mean(D)','AST_mean','AST_a(me-med)','AST_med(D)','AST_med','AST_Min','AST_mode','AST_len','AST_25q','AST_50q','AST_Max-Min','AST_Sgn(mean(D))','AST_std(D)','AST_std','AST_sum','AST_std^2','AST_std(d)^2','Bilirubin_Oianz','Bilirubin_F-L','Bilirubin_F','Bilirubin_Max(D)','Bilirubin_Max(D)-Min(D)','Bilirubin_Max','Bilirubin_mean(D)','Bilirubin_mean','Bilirubin_a(me-med)','Bilirubin_med(D)','Bilirubin_med','Bilirubin_Min','Bilirubin_mode','Bilirubin_len','Bilirubin_25q','Bilirubin_50q','Bilirubin_Max-Min','Bilirubin_Sgn(mean(D))','Bilirubin_std(D)','Bilirubin_std','Bilirubin_sum','Bilirubin_std^2','Bilirubin_std(d)^2','BUN_Oianz','BUN_F-L','BUN_F','BUN_Max(D)','BUN_Max(D)-Min(D)','BUN_Max','BUN_mean(D)','BUN_mean','BUN_a(me-med)','BUN_med(D)','BUN_med','BUN_Min','BUN_mode','BUN_len','BUN_25q','BUN_50q','BUN_Max-Min','BUN_Sgn(mean(D))','BUN_std(D)','BUN_std','BUN_sum','BUN_std^2','BUN_std(d)^2','Cholesterol_Oianz','Cholesterol_F-L','Cholesterol_F','Cholesterol_Max(D)','Cholesterol_Max(D)-Min(D)','Cholesterol_Max','Cholesterol_mean(D)','Cholesterol_mean','Cholesterol_a(me-med)','Cholesterol_med(D)','Cholesterol_med','Cholesterol_Min','Cholesterol_mode','Cholesterol_len','Cholesterol_25q','Cholesterol_50q','Cholesterol_Max-Min','Cholesterol_Sgn(mean(D))','Cholesterol_std(D)','Cholesterol_std','Cholesterol_sum','Cholesterol_std^2','Cholesterol_std(d)^2','Creatinine_Oianz','Creatinine_F-L','Creatinine_F','Creatinine_Max(D)','Creatinine_Max(D)-Min(D)','Creatinine_Max','Creatinine_mean(D)','Creatinine_mean','Creatinine_a(me-med)','Creatinine_med(D)','Creatinine_med','Creatinine_Min','Creatinine_mode','Creatinine_len','Creatinine_25q','Creatinine_50q','Creatinine_Max-Min','Creatinine_Sgn(mean(D))','Creatinine_std(D)','Creatinine_std','Creatinine_sum','Creatinine_std^2','Creatinine_std(d)^2','DiasABP_Oianz','DiasABP_F-L','DiasABP_F','DiasABP_Max(D)','DiasABP_Max(D)-Min(D)','DiasABP_Max','DiasABP_mean(D)','DiasABP_mean','DiasABP_a(me-med)','DiasABP_med(D)','DiasABP_med','DiasABP_Min','DiasABP_mode','DiasABP_len','DiasABP_25q','DiasABP_50q','DiasABP_Max-Min','DiasABP_Sgn(mean(D))','DiasABP_std(D)','DiasABP_std','DiasABP_sum','DiasABP_std^2','DiasABP_std(d)^2','FiO2_Oianz','FiO2_F-L','FiO2_F','FiO2_Max(D)','FiO2_Max(D)-Min(D)','FiO2_Max','FiO2_mean(D)','FiO2_mean','FiO2_a(me-med)','FiO2_med(D)','FiO2_med','FiO2_Min','FiO2_mode','FiO2_len','FiO2_25q','FiO2_50q','FiO2_Max-Min','FiO2_Sgn(mean(D))','FiO2_std(D)','FiO2_std','FiO2_sum','FiO2_std^2','FiO2_std(d)^2','GCS_Oianz','GCS_F-L','GCS_F','GCS_Max(D)','GCS_Max(D)-Min(D)','GCS_Max','GCS_mean(D)','GCS_mean','GCS_a(me-med)','GCS_med(D)','GCS_med','GCS_Min','GCS_mode','GCS_len','GCS_25q','GCS_50q','GCS_Max-Min','GCS_Sgn(mean(D))','GCS_std(D)','GCS_std','GCS_sum','GCS_std^2','GCS_std(d)^2','Glucose_Oianz','Glucose_F-L','Glucose_F','Glucose_Max(D)','Glucose_Max(D)-Min(D)','Glucose_Max','Glucose_mean(D)','Glucose_mean','Glucose_a(me-med)','Glucose_med(D)','Glucose_med','Glucose_Min','Glucose_mode','Glucose_len','Glucose_25q','Glucose_50q','Glucose_Max-Min','Glucose_Sgn(mean(D))','Glucose_std(D)','Glucose_std','Glucose_sum','Glucose_std^2','Glucose_std(d)^2','HCO3_Oianz','HCO3_F-L','HCO3_F','HCO3_Max(D)','HCO3_Max(D)-Min(D)','HCO3_Max','HCO3_mean(D)','HCO3_mean','HCO3_a(me-med)','HCO3_med(D)','HCO3_med','HCO3_Min','HCO3_mode','HCO3_len','HCO3_25q','HCO3_50q','HCO3_Max-Min','HCO3_Sgn(mean(D))','HCO3_std(D)','HCO3_std','HCO3_sum','HCO3_std^2','HCO3_std(d)^2','HCT_Oianz','HCT_F-L','HCT_F','HCT_Max(D)','HCT_Max(D)-Min(D)','HCT_Max','HCT_mean(D)','HCT_mean','HCT_a(me-med)','HCT_med(D)','HCT_med','HCT_Min','HCT_mode','HCT_len','HCT_25q','HCT_50q','HCT_Max-Min','HCT_Sgn(mean(D))','HCT_std(D)','HCT_std','HCT_sum','HCT_std^2','HCT_std(d)^2','HR_Oianz','HR_F-L','HR_F','HR_Max(D)','HR_Max(D)-Min(D)','HR_Max','HR_mean(D)','HR_mean','HR_a(me-med)','HR_med(D)','HR_med','HR_Min','HR_mode','HR_len','HR_25q','HR_50q','HR_Max-Min','HR_Sgn(mean(D))','HR_std(D)','HR_std','HR_sum','HR_std^2','HR_std(d)^2','K_Oianz','K_F-L','K_F','K_Max(D)','K_Max(D)-Min(D)','K_Max','K_mean(D)','K_mean','K_a(me-med)','K_med(D)','K_med','K_Min','K_mode','K_len','K_25q','K_50q','K_Max-Min','K_Sgn(mean(D))','K_std(D)','K_std','K_sum','K_std^2','K_std(d)^2','Lactate_Oianz','Lactate_F-L','Lactate_F','Lactate_Max(D)','Lactate_Max(D)-Min(D)','Lactate_Max','Lactate_mean(D)','Lactate_mean','Lactate_a(me-med)','Lactate_med(D)','Lactate_med','Lactate_Min','Lactate_mode','Lactate_len','Lactate_25q','Lactate_50q','Lactate_Max-Min','Lactate_Sgn(mean(D))','Lactate_std(D)','Lactate_std','Lactate_sum','Lactate_std^2','Lactate_std(d)^2','Mg_Oianz','Mg_F-L','Mg_F','Mg_Max(D)','Mg_Max(D)-Min(D)','Mg_Max','Mg_mean(D)','Mg_mean','Mg_a(me-med)','Mg_med(D)','Mg_med','Mg_Min','Mg_mode','Mg_len','Mg_25q','Mg_50q','Mg_Max-Min','Mg_Sgn(mean(D))','Mg_std(D)','Mg_std','Mg_sum','Mg_std^2','Mg_std(d)^2','MAP_Oianz','MAP_F-L','MAP_F','MAP_Max(D)','MAP_Max(D)-Min(D)','MAP_Max','MAP_mean(D)','MAP_mean','MAP_a(me-med)','MAP_med(D)','MAP_med','MAP_Min','MAP_mode','MAP_len','MAP_25q','MAP_50q','MAP_Max-Min','MAP_Sgn(mean(D))','MAP_std(D)','MAP_std','MAP_sum','MAP_std^2','MAP_std(d)^2','MechVent_Oianz','MechVent_F-L','MechVent_F','MechVent_Max(D)','MechVent_Max(D)-Min(D)','MechVent_Max','MechVent_mean(D)','MechVent_mean','MechVent_a(me-med)','MechVent_med(D)','MechVent_med','MechVent_Min','MechVent_mode','MechVent_len','MechVent_25q','MechVent_50q','MechVent_Max-Min','MechVent_Sgn(mean(D))','MechVent_std(D)','MechVent_std','MechVent_sum','MechVent_std^2','MechVent_std(d)^2','Na_Oianz','Na_F-L','Na_F','Na_Max(D)','Na_Max(D)-Min(D)','Na_Max','Na_mean(D)','Na_mean','Na_a(me-med)','Na_med(D)','Na_med','Na_Min','Na_mode','Na_len','Na_25q','Na_50q','Na_Max-Min','Na_Sgn(mean(D))','Na_std(D)','Na_std','Na_sum','Na_std^2','Na_std(d)^2','NIDiasABP_Oianz','NIDiasABP_F-L','NIDiasABP_F','NIDiasABP_Max(D)','NIDiasABP_Max(D)-Min(D)','NIDiasABP_Max','NIDiasABP_mean(D)','NIDiasABP_mean','NIDiasABP_a(me-med)','NIDiasABP_med(D)','NIDiasABP_med','NIDiasABP_Min','NIDiasABP_mode','NIDiasABP_len','NIDiasABP_25q','NIDiasABP_50q','NIDiasABP_Max-Min','NIDiasABP_Sgn(mean(D))','NIDiasABP_std(D)','NIDiasABP_std','NIDiasABP_sum','NIDiasABP_std^2','NIDiasABP_std(d)^2','NIMAP_Oianz','NIMAP_F-L','NIMAP_F','NIMAP_Max(D)','NIMAP_Max(D)-Min(D)','NIMAP_Max','NIMAP_mean(D)','NIMAP_mean','NIMAP_a(me-med)','NIMAP_med(D)','NIMAP_med','NIMAP_Min','NIMAP_mode','NIMAP_len','NIMAP_25q','NIMAP_50q','NIMAP_Max-Min','NIMAP_Sgn(mean(D))','NIMAP_std(D)','NIMAP_std','NIMAP_sum','NIMAP_std^2','NIMAP_std(d)^2','NISysABP_Oianz','NISysABP_F-L','NISysABP_F','NISysABP_Max(D)','NISysABP_Max(D)-Min(D)','NISysABP_Max','NISysABP_mean(D)','NISysABP_mean','NISysABP_a(me-med)','NISysABP_med(D)','NISysABP_med','NISysABP_Min','NISysABP_mode','NISysABP_len','NISysABP_25q','NISysABP_50q','NISysABP_Max-Min','NISysABP_Sgn(mean(D))','NISysABP_std(D)','NISysABP_std','NISysABP_sum','NISysABP_std^2','NISysABP_std(d)^2','PaCO2_Oianz','PaCO2_F-L','PaCO2_F','PaCO2_Max(D)','PaCO2_Max(D)-Min(D)','PaCO2_Max','PaCO2_mean(D)','PaCO2_mean','PaCO2_a(me-med)','PaCO2_med(D)','PaCO2_med','PaCO2_Min','PaCO2_mode','PaCO2_len','PaCO2_25q','PaCO2_50q','PaCO2_Max-Min','PaCO2_Sgn(mean(D))','PaCO2_std(D)','PaCO2_std','PaCO2_sum','PaCO2_std^2','PaCO2_std(d)^2','PaO2_Oianz','PaO2_F-L','PaO2_F','PaO2_Max(D)','PaO2_Max(D)-Min(D)','PaO2_Max','PaO2_mean(D)','PaO2_mean','PaO2_a(me-med)','PaO2_med(D)','PaO2_med','PaO2_Min','PaO2_mode','PaO2_len','PaO2_25q','PaO2_50q','PaO2_Max-Min','PaO2_Sgn(mean(D))','PaO2_std(D)','PaO2_std','PaO2_sum','PaO2_std^2','PaO2_std(d)^2','pH_Oianz','pH_F-L','pH_F','pH_Max(D)','pH_Max(D)-Min(D)','pH_Max','pH_mean(D)','pH_mean','pH_a(me-med)','pH_med(D)','pH_med','pH_Min','pH_mode','pH_len','pH_25q','pH_50q','pH_Max-Min','pH_Sgn(mean(D))','pH_std(D)','pH_std','pH_sum','pH_std^2','pH_std(d)^2','Platelets_Oianz','Platelets_F-L','Platelets_F','Platelets_Max(D)','Platelets_Max(D)-Min(D)','Platelets_Max','Platelets_mean(D)','Platelets_mean','Platelets_a(me-med)','Platelets_med(D)','Platelets_med','Platelets_Min','Platelets_mode','Platelets_len','Platelets_25q','Platelets_50q','Platelets_Max-Min','Platelets_Sgn(mean(D))','Platelets_std(D)','Platelets_std','Platelets_sum','Platelets_std^2','Platelets_std(d)^2','RespRate_Oianz','RespRate_F-L','RespRate_F','RespRate_Max(D)','RespRate_Max(D)-Min(D)','RespRate_Max','RespRate_mean(D)','RespRate_mean','RespRate_a(me-med)','RespRate_med(D)','RespRate_med','RespRate_Min','RespRate_mode','RespRate_len','RespRate_25q','RespRate_50q','RespRate_Max-Min','RespRate_Sgn(mean(D))','RespRate_std(D)','RespRate_std','RespRate_sum','RespRate_std^2','RespRate_std(d)^2','SaO2_Oianz','SaO2_F-L','SaO2_F','SaO2_Max(D)','SaO2_Max(D)-Min(D)','SaO2_Max','SaO2_mean(D)','SaO2_mean','SaO2_a(me-med)','SaO2_med(D)','SaO2_med','SaO2_Min','SaO2_mode','SaO2_len','SaO2_25q','SaO2_50q','SaO2_Max-Min','SaO2_Sgn(mean(D))','SaO2_std(D)','SaO2_std','SaO2_sum','SaO2_std^2','SaO2_std(d)^2','SysABP_Oianz','SysABP_F-L','SysABP_F','SysABP_Max(D)','SysABP_Max(D)-Min(D)','SysABP_Max','SysABP_mean(D)','SysABP_mean','SysABP_a(me-med)','SysABP_med(D)','SysABP_med','SysABP_Min','SysABP_mode','SysABP_len','SysABP_25q','SysABP_50q','SysABP_Max-Min','SysABP_Sgn(mean(D))','SysABP_std(D)','SysABP_std','SysABP_sum','SysABP_std^2','SysABP_std(d)^2','Temp_Oianz','Temp_F-L','Temp_F','Temp_Max(D)','Temp_Max(D)-Min(D)','Temp_Max','Temp_mean(D)','Temp_mean','Temp_a(me-med)','Temp_med(D)','Temp_med','Temp_Min','Temp_mode','Temp_len','Temp_25q','Temp_50q','Temp_Max-Min','Temp_Sgn(mean(D))','Temp_std(D)','Temp_std','Temp_sum','Temp_std^2','Temp_std(d)^2','TropI_Oianz','TropI_F-L','TropI_F','TropI_Max(D)','TropI_Max(D)-Min(D)','TropI_Max','TropI_mean(D)','TropI_mean','TropI_a(me-med)','TropI_med(D)','TropI_med','TropI_Min','TropI_mode','TropI_len','TropI_25q','TropI_50q','TropI_Max-Min','TropI_Sgn(mean(D))','TropI_std(D)','TropI_std','TropI_sum','TropI_std^2','TropI_std(d)^2','TropT_Oianz','TropT_F-L','TropT_F','TropT_Max(D)','TropT_Max(D)-Min(D)','TropT_Max','TropT_mean(D)','TropT_mean','TropT_a(me-med)','TropT_med(D)','TropT_med','TropT_Min','TropT_mode','TropT_len','TropT_25q','TropT_50q','TropT_Max-Min','TropT_Sgn(mean(D))','TropT_std(D)','TropT_std','TropT_sum','TropT_std^2','TropT_std(d)^2','Urine_Oianz','Urine_F-L','Urine_F','Urine_Max(D)','Urine_Max(D)-Min(D)','Urine_Max','Urine_mean(D)','Urine_mean','Urine_a(me-med)','Urine_med(D)','Urine_med','Urine_Min','Urine_mode','Urine_len','Urine_25q','Urine_50q','Urine_Max-Min','Urine_Sgn(mean(D))','Urine_std(D)','Urine_std','Urine_sum','Urine_std^2','Urine_std(d)^2','WBC_Oianz','WBC_F-L','WBC_F','WBC_Max(D)','WBC_Max(D)-Min(D)','WBC_Max','WBC_mean(D)','WBC_mean','WBC_a(me-med)','WBC_med(D)','WBC_med','WBC_Min','WBC_mode','WBC_len','WBC_25q','WBC_50q','WBC_Max-Min','WBC_Sgn(mean(D))','WBC_std(D)','WBC_std','WBC_sum','WBC_std^2','WBC_std(d)^2']
pri_data.append(head)
sd=0
for file in x:
    RecordID=0
    Age =0
    Gender=0
    Height =0.0
    ICUType =0
    Weight =0.0
    lists=['Albumin','ALP','ALT','AST','Bilirubin','BUN','Cholesterol','Creatinine','DiasABP','FiO2','GCS','Glucose','HCO3','HCT','HR','K','Lactate','Mg','MAP','MechVent','Na','NIDiasABP','NIMAP','NISysABP','PaCO2','PaO2','pH','Platelets','RespRate','SaO2','SysABP','Temp','TropI','TropT','Urine','WBC']
    dict={}
    i=0
    for liste in lists:
        dict[liste]=i
        i+=1
    
    df=pd.read_csv(file)
    final_x=[[] for i in range(40)]
    time_x=[[] for i in range(40)]
    data=[]
   
    headers=['RecordID','Age','Gender','Height','ICUType','Weight']
    
    for row in df.iterrows():
        
        if row[1]['Parameter'] == 'RecordID':
            
           
            if row[1]['Value']==-1:
                RecordID='NA'
            else:    
                RecordID=row[1]['Value']
                
        elif row[1]['Parameter'] == 'Age':
            
             if row[1]['Value']==-1:
                Age='NA'
             else: 
                Age=int(row[1]['Value'])
        elif row[1]['Parameter'] == 'Gender':
            if row[1]['Value']==-1:
                Gender='NA'
            else: 
                Gender=int(row[1]['Value'])
        elif row[1]['Parameter'] == 'Height':
            if row[1]['Value']==-1:
                Height='NA'
            else: 
                Height=float(row[1]['Value'])
        elif row[1]['Parameter'] == 'ICUType':
            if row[1]['Value']==-1:
                ICUType='NA'
            else: 
                ICUType=int(row[1]['Value'])            
        elif row[1]['Parameter'] == 'Weight':
            if row[1]['Value']==-1:
                Weight='NA'
            else: 
                Weight=int(row[1]['Value'])
        else :
            if row[1]['Parameter'] in dict:
                final_x[dict[row[1]['Parameter']]].append(int(row[1]['Value']))
                time_x[dict[row[1]['Parameter']]].append("00:"+row[1]['Time'])

    data.append(RecordID)
    data.append(Age)
    data.append(Gender)
    data.append(Height)
    data.append(ICUType)
    data.append(Weight)
    deri=[1,2,3]
    for liste in lists:
        j=final_x[dict[liste]]
        if len(final_x[dict[liste]]) != 0:
            deri = derivative(time_x[dict[liste]], final_x[dict[liste]])
       
            quartiles = quartile(final_x[dict[liste]])
            
            
            data.append(one_if_all_non_zero(final_x[dict[liste]]))
            data.append(first(j) - last(j))
            data.append(first(j))
            data.append(Max(deri))
            data.append(Max(deri) - Min(deri))
            data.append(Max(j))
            data.append(mean(deri))
            data.append(mean(j))
            data.append(abs(mean(j) - median(j)))
            data.append(median(deri))
            data.append(median(j))
            data.append(Min(j))
            data.append(mode(j))
            data.append(len(j))
            data.append(quartiles[0])
            data.append(quartiles[1])
            data.append(Max(j) - Min(j))
            data.append(signum(mean(deri)))
            data.append(std(deri))
            data.append(std(j))
            data.append(sum(j))
            data.append(std(j)**2)
            data.append(std(deri)**2)
            
        else:
            for i in range(23):
                data.append('NA')
                   
         
    pri_data.append(data) 
    print(sd)
    sd+=1
        
import csv 
with open('data.csv', 'w') as csvfile:
     
    csvwriter = csv.writer(csvfile) 
    csvwriter.writerows(pri_data)	
    