# node-red-contrib-ipwhois
This is a package to convert IP address to WHOIS information with Node-RED.
## Install
```
npm install node-red-contrib-ipwhois
```

## Usage
Return value is json format.

e.g. Input '8.8.8.8' as 'msg.payload'.
```
{ 
    ip: '8.8.8.8'
    netname: 'LVLT-GOGL-8-8-8'
    descr: 'Google LLC'
    country: 'US' 
}
```
