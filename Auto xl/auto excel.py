import os
import pandas as pd


folder_path = str(input('Enter Your Path : '))

files = os.listdir(folder_path)

excel_files = [file for file in files if file.endswith('.xlsx') or file.endswith('.xls')]


for excel_file in excel_files:
    file_path = os.path.join(folder_path, excel_file)
    engine = 'openpyxl' if excel_file.endswith('.xlsx') else 'xlrd'
    
    try:
        df = pd.read_excel(file_path, engine=engine,index_col=None)
        print(f"File: {excel_file}")
        print(df.head(5))
        print("\n" + "="*50 + "\n")  
    except Exception as e:
        print(f"Error reading {excel_file}: {e}")