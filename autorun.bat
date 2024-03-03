cd E:\ai-server-eee
SET log_file=%cd%\log.txt
SET err_file=%cd%\err.txt
SET PYTHONUNBUFFERED=1
call E:\anaconda3\Scripts\activate.bat
call conda activate ldm
python main.py 1>>%log_file% 2>>%err_file%