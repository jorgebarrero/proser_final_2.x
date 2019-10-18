SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root

sudo systemctl stop firewalld
/usr/bin/pm2 kill; sleep 10; /usr/bin/pm2 resurrect
