@REM don't watch the sausage being made
@ECHO OFF

REM the folder this script is in (*/bootplate/tools)
SET TOOLS=%~DP0

REM enyo location
SET ENYO=%TOOLS%\..\enyo

REM deploy script location
SET DEPLOY=%ENYO%\tools\deploy.js

REM node location
SET NODE=node.exe

REM use node to invoke deploy.js with imported parameters
%NODE% "%DEPLOY%" %*

SET BIN=%TOOLS%\..\bin
mkdir %BIN%

SET PACKAGE_NAME=com.mobileteck.freeTetherCleaner
SET PACKAGE_PATH=deploy\%PACKAGE_NAME%

copy appinfo.json %PACKAGE_PATH%
copy index.html %PACKAGE_PATH%
copy icon.png %PACKAGE_PATH%

mkdir %PACKAGE_PATH%\control
copy control\postinst %PACKAGE_PATH%\control
copy control\prerm %PACKAGE_PATH%\control

call palm-package %PACKAGE_PATH% service package -o %BIN%
ar q bin/*.ipk pmPostInstall.script
ar q bin/*.ipk pmPreRemove.script
