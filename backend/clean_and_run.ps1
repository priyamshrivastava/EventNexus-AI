Stop-Process -Name "java" -Force -ErrorAction SilentlyContinue
Stop-Process -Name "javaw" -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Remove-Item -Recurse -Force .\target\ -ErrorAction SilentlyContinue
mvn spring-boot:run