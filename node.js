function get_value(v) {
    kv = v.split(':');
    return kv.length > 1 ? kv[1].replace(/^\s+/g, "") : "";
}

function is_match(l, r) {
    var result = ""
    for (i = l.length-1; i >= 0; i--) {
        if (r.test(l[i])) {
            result = get_value(l[i]);
            return result;
        }
    }
    return result;
}

var ip_ptn = /(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/;
var info = {};
var data_list = 1;

module.exports = function (RED) {
    function IpWhoisNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg) {
            var ip = msg.payload;
            var whois = require('whois');
            if (ip_ptn.test(ip)) {
                whois.lookup(ip, function (err, data) {
                    if (err) {
                        node.error(err);
                    }
                    data_list = data.split('\n');
                    info.ip = ip;
                    info.netname = is_match(data_list, /[Nn]et[Nn]ame:/);
                    info.descr = is_match(data_list, /[Dd]escr:|[Oo]rg[Nn]ame:/);
                    info.country = is_match(data_list, /[Cc]ountry:/);
                    msg.payload = info;
                    node.send(msg);
                });
            }
            else {
                msg.payload = "Please set ip-address to 'msg.payload.'";
                node.send(msg);
            }
        });
    }
    RED.nodes.registerType("ipwhois", IpWhoisNode);
}
