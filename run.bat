@echo off
setlocal

if exist ".venv\Scripts\python.exe" (
  ".venv\Scripts\python.exe" script.py
) else (
  python script.py
)

endlocal

