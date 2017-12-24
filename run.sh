kill -9 $(pidof mongod)
kill -9 $(pidof server_linux_amd64)
kill -9 $(pidof caddy)
nohup mongod --auth --dbpath=/usr/local/var/mongodb &
sudo nohup ./caddy &>caddy.log &
cd ./server
sudo nohup  ./server_linux_amd64 &>server_log.log & 
