SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root

## STOP PM2
pm2 kill

## TEST
cp -f temp.txt /var/www/html/
cp -f pm2-config.txt /var/www/html/

## ENABLE PROSER PORTS
firewall-cmd --zone=public --add-port=3151/tcp --permanent;
firewall-cmd --zone=public --add-port=3152/tcp --permanent;
firewall-cmd --reload

## UNTAR FILE
tar -xvf proser_reports.tar -C /var/www/html

## CONFIG FILES
cp -f config/index.html  /var/www/html/
cp -f config/htaccess  /var/www/html/.htaccess
cp -f config/env  /var/www/html/proser_reports/.env
cp -f config/hostInfo  /var/www/html/proser_reports/.hostInfo
cp -f config/env.js  /var/www/html/proser_reports/dist/init/assets/js

cp -f config/client-intro.png /var/www/html/proser_reports/dist/init/assets/img/logos_client/
cp -f config/client-logo.png  /var/www/html/proser_reports/dist/init/assets/img/logos_client/

## INSTALL NODE MODULES
cd /var/www/html/proser_reports/
npm i

## RESTART PM2
pm2 kill
pm2 resurrect
pm2 list


