const Autodiscovery = require('@dsign/library').net.Autodiscovery;

console.log('Client 3');

var client = new Autodiscovery('toni');


setTimeout(
    ()  => {
        client.disconnect();
    },
    20000
)

setTimeout(
    ()  => {
        client.connect();
    },
    50000
)