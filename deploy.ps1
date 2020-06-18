# paths variables
$dir = Get-Location
Set-Variable -Name "workspace" -Value "C:\Users\Pierre-Marie\Documents\Dev\workspace\dsm-landing"
Set-Variable -Name "web" -Value "\\myNas\web\DSM-Landing"
cd $workspace

# build the app then build the apk
Write-Host "Build angular app" -ForegroundColor Cyan
yarn build
# Insert timestamp
$content = Get-Content(".\dist\index.html") -Encoding 'UTF8'
$content = $content.replace('{{timestamp}}', (Get-Date -UFormat '%d/%m/%Y %Hh%M'))
$content | out-file -Encoding 'UTF8' (".\dist\index.html")
Write-Host "Finish building" -ForegroundColor Green
rm -r -fo ($web + "\dist")
Copy-Item -Force -Path dist -Destination $web -Recurse
Write-Host "Finish copying" -ForegroundColor Green

# Logging result
if((Get-Item ($web + "\dist\*")).length -lt 10) {
	Write-Host "AN ERROR OCCURRED" -ForegroundColor Red
} else {
	Write-Host "APP SUCCESSFULLY DEPLOYED" -ForegroundColor Green
}

cd $dir
pause
