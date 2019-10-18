# Close port

```
$ lsof -i :3151

COMMAND   PID  USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node    17150 jorge   19u  IPv4 714368      0t0  TCP *:3151 (LISTEN)

$ kill 17150
```
