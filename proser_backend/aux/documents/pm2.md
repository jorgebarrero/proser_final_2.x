pm2 install pm2-logrotate

pm2 startup

pm2 start --name SERVER ./src/server/server.js --interpreter ./node_modules/.bin/babel-node
pm2 start --name UPDATE ./src/sync/etl/load/load_day.js --interpreter ./node_modules/.bin/babel-node
pm2 start --name HISTORY ./src/sync/etl/load/load_history.js --interpreter ./node_modules/.bin/babel-node

pm2 save