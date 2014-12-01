
#!/bin/sh                                                                                       

SID=com.mobileteck.freetether.cleaner.service
APPS=/media/cryptofs/apps

NSRVDIR=${APPS}/usr/palm/services/${SID}

echo "Removing old Service files...."

# Remove the dbus service
rm -f /var/usr/sbin/${SID}


# Remove the node dbus service
rm -f /var/palm/ls2/services/prv/${SID}.service
rm -f /var/palm/ls2/services/pub/${SID}.service

# Remove the node ls2 roles
rm -f /var/palm/ls2/roles/prv/${SID}.json
rm -f /var/palm/ls2/roles/pub/${SID}.json
/usr/bin/ls-control scan-services || true

# Stop the node service if running
/usr/bin/luna-send -n 1 palm://${SID}/__quit '{}'

echo "Installing Service...."

sed -e "s|jail=on|jail=off|" -e "s|SERVICE_PATH=\$1|set ${NSRVDIR}\n\nSERVICE_PATH=\$1|" \
    /usr/bin/run-js-service > /var/usr/sbin/${SID}
chmod ugo+x /var/usr/sbin/${SID}


# Install the dbus service
cp $NSRVDIR/dbus/${SID}.service /var/palm/ls2/services/prv/${SID}.service
cp $NSRVDIR/dbus/${SID}.service /var/palm/ls2/services/pub/${SID}.service

# Install the ls2 roles
if [ -d /var/palm/ls2/roles ]; then
	cp $NSRVDIR/dbus/${SID}.json /var/palm/ls2/roles/prv/${SID}.json
	cp $NSRVDIR/dbus/${SID}.json /var/palm/ls2/roles/pub/${SID}.json
	/usr/bin/ls-control scan-services || true
fi

exit 0