const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 6759 });

const messages = [
    {
        id: 1,
        text: 'Hello everyone!!!'
    },
    {
        id: 2,
        text: 'I\'m here!!!'
    },
    {
        id: 3,
        text: 'Who there???'
    },
    {
        id: 4,
        text: 'Damn!'
    },
    {
        id: 5,
        text: 'I\'m off'
    }
];
const texts = ['Text Data'];
let counter = 0;


wss.on('connection', (ws) => {
    console.log('WebSocket connection!');

    ws.on('message', (event) => {
        const data = JSON.parse(event);
        const res = JSON.parse(data);

        switch (res.event) {
            case 'set-text':
                texts.unshift(res.data);

                break;
            case 'remove-text':
                texts.splice(res.data, 1);
                break;
        }

        ws.send(JSON.stringify({
            event: 'update-texts',
            data: texts
        }));

        console.log('message', data);
    });

    ws.send(JSON.stringify({
        event: 'messages',
        data: messages
    }));

    ws.send(JSON.stringify({
        event: 'update-texts',
        data: texts
    }));

    const timer = () => {
        ws.send(JSON.stringify({
            event: 'counter',
            data: ++counter
        }));
    };

    const interval = setInterval(timer, 1000);

    ws.on('close', () => {
        console.log('disconnected');
        clearInterval(interval);
    });

});
