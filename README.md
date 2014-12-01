FreeTether Cleaner Service
==========================

If you are a frequent user of FreeTether on Pre3, you might notice if you shutdown freetether it will not work again until you restart your phone. 

This appears to be an issue with the cleanup part not quite working when the app is shutdown. After some research I found out that this is due to bridge0 device been left hanging around. 

You can void the reboot if you get a shell and issue the following two commands

    ifconfig bridge0 down
    brctl delbr bridge0

This app simply do just that, but from an App, avoiding the hassle of having to get shell and typing those commands. 

This is probably best if done directly in the freetether code. But I couldn't figure out how to compile the C code. So I had to resort to a shell script and a separate app.

## Installtion 

    git clone https://github.com/mobileteck/FreeTetherCleanup.git
    cd FreeTetherCleanup
    git submodule update --init
    tools\deploy-webos.bat
    palm-install bin\*.ipk


## Usage

- Open the app
- Press Check Button to see if the bridge0 is still there. 
- Press Clean Button to clean it up. 